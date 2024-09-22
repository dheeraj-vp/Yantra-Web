import { google } from 'googleapis';
import dotenv from "dotenv";
import fs from "fs";
import express from "express";
import { htmlToText } from 'html-to-text'; 
import cron from 'node-cron';
import { senderSubjectBody, senderSubject, bodySubject, senderBody, Sender, Subject, Body, keywordsQuery, getKeywords } from '../models/email.model'; // Updated to include getKeywords

dotenv.config();
const app = express();
const port = 3000;

const credentials = JSON.parse(fs.readFileSync("../config/credentials.json"));
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
const SCOPES = [
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.readonly'
];

let historyId = null; // Global variable to store historyId after the first run

const authURL = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
console.log('Authorize this app by visiting this URL:', authURL);

app.get('/', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.send('Authorization failed. No code returned.');
    }

    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        fs.writeFileSync('token.json', JSON.stringify(tokens));
        res.send('Authorization successful! You can close this window.');

        const firstTime = true; // Change this based on your logic to detect the first time user
        if (firstTime) {
            const maxResults = 10; // User-defined limit for first-time emails
            await fetchInitialEmails(oAuth2Client, maxResults);
            firstTime = false;
        } else {
            await fetchUnreadEmails(oAuth2Client);
        }
    } catch (err) {
        return res.send(`Error retrieving access tokens: ${err}`);
    }
});

cron.schedule('*/15 * * * *', async () => {
    try {
        console.log('Checking for new emails...');
        
        // Refresh token if needed
        if (oAuth2Client.isTokenExpiring()) {
            const newToken = await oAuth2Client.getAccessToken();
            oAuth2Client.setCredentials(newToken);
        }

        const auth = oAuth2Client;  // Use your stored OAuth client
        await fetchUnreadEmails(auth);  // Function to fetch unread emails
    } catch (err) {
        console.error('Error while checking for new emails:', err);
    }
});


async function addKeywords(sender, body, subject) {
    // DB keywords Query
    keywordsQuery(sender, body, subject);
}

async function getPlainTextBody(parts) {
    let body = '';

    function findPlainText(parts) {
        for (const part of parts) {
            if (part.mimeType === 'text/plain' && part.body.data) {
                body += Buffer.from(part.body.data, 'base64').toString('utf-8');
            } else if (part.mimeType === 'text/html' && part.body.data) {
                const htmlContent = Buffer.from(part.body.data, 'base64').toString('utf-8');
                body += htmlToText(htmlContent); 
            } else if (part.parts) {
                findPlainText(part.parts);
            }
        }
    }
    findPlainText(parts);
    return body;
}

async function checkKeywords(gmail, message, keywords) {
    try {
        const messageId = message.id;
        const messageDetail = await gmail.users.messages.get({
            userId: 'me',
            id: messageId,
        });

        const senderHeader = messageDetail.data.payload.headers.find(header => header.name === 'From');
        const sender = senderHeader ? senderHeader.value : 'Unknown Sender';
        const subject = messageDetail.data.payload.headers.find(header => header.name === 'Subject')?.value || 'No Subject';
        let body = '';

        if (messageDetail.data.payload.parts) {
            body = await getPlainTextBody(messageDetail.data.payload.parts);
        } else if (messageDetail.data.payload.body.data) {
            const bodyContent = Buffer.from(messageDetail.data.payload.body.data, 'base64').toString('utf-8');
            body = messageDetail.data.payload.mimeType === 'text/html' ? htmlToText(bodyContent) : bodyContent;
        }

        console.log(`Sender: ${sender}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${body}`);

        const conditions = [
            sender.includes(keywords.sender) ? 'SENDER' : '',
            body.includes(keywords.body) ? 'BODY' : '',
            subject.includes(keywords.subject) ? 'SUBJECT' : ''
        ];

        const conditionKey = conditions.filter(Boolean).join('_');

        switch (conditionKey) {
            case 'SENDER_BODY_SUBJECT':
                console.log('Matched sender, body, and subject');
                senderSubjectBody(sender, messageId, subject);
                break;
            case 'SENDER_SUBJECT':
                console.log('Matched sender and subject');
                senderSubject(sender, messageId, subject);
                break;
            case 'BODY_SUBJECT':
                console.log('Matched body and subject');
                bodySubject(sender, messageId, subject);
                break;
            case 'SENDER_BODY':
                console.log('Matched sender and body');
                senderBody(sender, messageId, subject);
                break;
            case 'SENDER':
                console.log('Matched sender');
                Sender(sender, messageId, subject);
                break;
            case 'SUBJECT':
                console.log('Matched subject');
                Subject(sender, messageId, subject);
                break;
            case 'BODY':
                console.log('Matched body');
                Body(sender, messageId, subject);
                break;
            default:
                console.log('No match');
                break;
        }
    } catch (err) {
        console.log(`Error fetching details for message ID ${message.id}:`, err);
    }
}

// Fetch keywords from the database and check against new emails
async function checkNewEmailWithKeywords(gmail, message) {
    try {
        // Fetch the message details
        const messageId = message.id;
        const messageDetail = await gmail.users.messages.get({
            userId: 'me',
            id: messageId,
        });

        const senderHeader = messageDetail.data.payload.headers.find(header => header.name === 'From');
        const sender = senderHeader ? senderHeader.value : 'Unknown Sender';
        const subject = messageDetail.data.payload.headers.find(header => header.name === 'Subject')?.value || 'No Subject';
        let body = '';

        if (messageDetail.data.payload.parts) {
            body = await getPlainTextBody(messageDetail.data.payload.parts);
        } else if (messageDetail.data.payload.body.data) {
            const bodyContent = Buffer.from(messageDetail.data.payload.body.data, 'base64').toString('utf-8');
            if (messageDetail.data.payload.mimeType === 'text/html') {
                body = htmlToText(bodyContent);
            } else if (messageDetail.data.payload.mimeType === 'text/plain') {
                body = bodyContent;
            }
        }

        console.log(`Checking email from ${sender} with subject "${subject}"`);

        // Fetch keywords from the database
        const keywordsResult = await db.query('SELECT * FROM userKeywords');
        const keywords = keywordsResult.rows;

        // Iterate through each keyword set in the database
        for (const keyword of keywords) {
            const matches = [];

            if (keyword.sender && sender.includes(keyword.sender)) {
                matches.push('SENDER');
            }
            if (keyword.subject && subject.includes(keyword.subject)) {
                matches.push('SUBJECT');
            }
            if (keyword.body && body.includes(keyword.body)) {
                matches.push('BODY');
            }

            const conditionKey = matches.join('_');

            // Insert into the respective table based on matches
            switch (conditionKey) {
                case 'SENDER_BODY_SUBJECT':
                    console.log('Matched sender, body, and subject');
                    await senderBodySubject(sender, messageId, subject);
                    break;
                case 'SENDER_SUBJECT':
                    console.log('Matched sender and subject');
                    await senderSubject(sender, messageId, subject);
                    break;
                case 'BODY_SUBJECT':
                    console.log('Matched body and subject');
                    await bodySubject(sender, messageId, subject);
                    break;
                case 'SENDER_BODY':
                    console.log('Matched sender and body');
                    await senderBody(sender, messageId, subject);
                    break;
                case 'SENDER':
                    console.log('Matched sender');
                    await Sender(sender, messageId, subject);
                    break;
                case 'SUBJECT':
                    console.log('Matched subject');
                    await Subject(sender, messageId, subject);
                    break;
                case 'BODY':
                    console.log('Matched body');
                    await Body(sender, messageId, subject);
                    break;
                default:
                    console.log('No match found for this email.');
                    break;
            }
        }
    } catch (err) {
        console.log(`Error fetching details for message ID ${message.id}:`, err);
    }
}


async function fetchInitialEmails(auth, maxResults) {
    const gmail = google.gmail({ version: 'v1', auth });
    const userKeywords = { sender: "", subject: "", body: "" }; // User-provided keywords at first sign-up

    addKeywords(userKeywords.sender, userKeywords.body, userKeywords.subject); // Add user keywords to DB

    try {
        const res = await gmail.users.messages.list({
            userId: 'me',
            q: '', // You can modify the query if needed
            maxResults: maxResults,
        });

        const messages = res.data.messages;
        if (messages && messages.length) {
            console.log('Messages:', messages);

            for (const message of messages) {
                await checkKeywords(gmail, message, userKeywords);
            }

            // Store the historyId after processing initial emails
            const profile = await gmail.users.getProfile({ userId: 'me' });
            historyId = profile.data.historyId; // Store historyId for next runs
            console.log('Stored historyId:', historyId);
        } else {
            console.log("No messages found.");
        }
    } catch (err) {
        console.log("API error:", err);
    }
}

async function fetchUnreadEmails(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    
    try {
        const res = await gmail.users.history.list({
            userId: 'me',
            startHistoryId: historyId, // Use the stored historyId to fetch unread messages
        });

        const history = res.data.history;
        if (history && history.length) {
            for (const historyItem of history) {
                if (historyItem.messagesAdded) {
                    for (const message of historyItem.messagesAdded) {
                        await checkNewEmailWithKeywords(gmail, message.message,); 
                    }
                }
            }
        } else {
            console.log("No new messages found.");
        }
    } catch (err) {
        console.log("Error fetching new emails:", err);
    }
}



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
