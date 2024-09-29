import { google } from 'googleapis';
import dotenv from "dotenv";
import fs from "fs";
import express from "express";
import { htmlToText } from 'html-to-text'; 
import cron from 'node-cron';
import { db,senderSubjectBody, senderSubject, bodySubject, senderBody, Sender, Subject, Body, keywordsQuery } from '../models/email.model';

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

let historyId = null;

const authURL = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES }); //access_type offline - requests refresh tokens along with access tokens, offline access allows the app to access user data even when user isnt actively using it.
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

        const firstTime = true; // Replace with logic to determine if it's the user's first time
        if (firstTime) {
            const maxResults = 10;
            await fetchInitialEmails(oAuth2Client, maxResults);
        } else {
            await fetchUnreadEmails(oAuth2Client);
        }
    } catch (err) {
        return res.send(`Error retrieving access tokens: ${err}`);
    }
});

cron.schedule('*/15 * * * *', async () => {
    console.log('Checking for new emails...');
    
    try {
        const auth = oAuth2Client;
        await fetchUnreadEmails(auth);
    } catch (err) {
        console.error('Error while checking for new emails:', err);
    }
});

async function fetchMessageDetails(gmail, messageId) {
    try {
        return await gmail.users.messages.get({
            userId: 'me',
            id: messageId,
        });
    } catch (err) {
        console.log(`Error fetching details for message ID ${messageId}:`, err);
        return null;
    }
}

async function extractMessageData(messageDetail) {
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

    return { sender, subject, body };
}

async function insertKeywordsAndLog(conditionKey, sender, messageId, subject) {
    switch (conditionKey) {
        case 'SENDER_BODY_SUBJECT':
            await senderSubjectBody(sender, messageId, subject);
            break;
        case 'SENDER_SUBJECT':
            await senderSubject(sender, messageId, subject);
            break;
        case 'BODY_SUBJECT':
            await bodySubject(sender, messageId, subject);
            break;
        case 'SENDER_BODY':
            await senderBody(sender, messageId, subject);
            break;
        case 'SENDER':
            await Sender(sender, messageId, subject);
            break;
        case 'SUBJECT':
            await Subject(sender, messageId, subject);
            break;
        case 'BODY':
            await Body(sender, messageId, subject);
            break;
        default:
            console.log('No match found for this email.');
            break;
    }
}

async function checkKeywords(gmail, message, keywords) {
    const messageDetail = await fetchMessageDetails(gmail, message.id);
    if (!messageDetail) return;

    const { sender, subject, body } = await extractMessageData(messageDetail);
    const conditions = [
        sender.includes(keywords.sender) ? 'SENDER' : '',
        body.includes(keywords.body) ? 'BODY' : '',
        subject.includes(keywords.subject) ? 'SUBJECT' : ''
    ];
    const conditionKey = conditions.filter(Boolean).join('_');

    await insertKeywordsAndLog(conditionKey, sender, message.id, subject);
}

async function checkNewEmailWithKeywords(gmail, message) {
    const messageDetail = await fetchMessageDetails(gmail, message.id);
    if (!messageDetail) return;

    const { sender, subject, body } = await extractMessageData(messageDetail);
    console.log(`Checking email from ${sender} with subject "${subject}"`);

    const keywordsResult = await db.query('SELECT * FROM userKeywords');
    const keywords = keywordsResult.rows;

    for (const keyword of keywords) {
        const matches = [];

        if (keyword.sender && sender.includes(keyword.sender)) matches.push('SENDER');
        if (keyword.subject && subject.includes(keyword.subject)) matches.push('SUBJECT');
        if (keyword.body && body.includes(keyword.body)) matches.push('BODY');

        const conditionKey = matches.join('_');
        await insertKeywordsAndLog(conditionKey, sender, message.id, subject);
    }
}

async function fetchInitialEmails(auth, maxResults) {
    const gmail = google.gmail({ version: 'v1', auth });
    const userKeywords = { sender: "", subject: "", body: "" };

    await addKeywords(userKeywords.sender, userKeywords.body, userKeywords.subject);

    try {
        const res = await gmail.users.messages.list({
            userId: 'me',
            q: '',
            maxResults: maxResults,
        });

        const messages = res.data.messages;
        if (messages && messages.length) {
            console.log('Messages:', messages);
            for (const message of messages) {
                await checkKeywords(gmail, message, userKeywords);
            }

            const profile = await gmail.users.getProfile({ userId: 'me' });
            historyId = profile.data.historyId;
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
            startHistoryId: historyId,
        });

        const history = res.data.history;
        if (history && history.length) {
            for (const historyItem of history) {
                if (historyItem.messagesAdded) {
                    for (const message of historyItem.messagesAdded) {
                        await checkNewEmailWithKeywords(gmail, message.message);
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
