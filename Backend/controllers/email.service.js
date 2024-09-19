import { google } from 'googleapis';
import dotenv from "dotenv";
import fs from "fs";
import express from "express";
import { htmlToText } from 'html-to-text'; // Include html-to-text

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

const authURL = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
console.log('Authorize this app by visiting this URL:', authURL);

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
            body = getPlainTextBody(messageDetail.data.payload.parts);
        } else if (messageDetail.data.payload.body.data) {
            const bodyContent = Buffer.from(messageDetail.data.payload.body.data, 'base64').toString('utf-8');
            if (messageDetail.data.payload.mimeType === 'text/html') {
                // Convert HTML to plain text
                body = htmlToText(bodyContent);
            } else if (messageDetail.data.payload.mimeType === 'text/plain') {
                body = bodyContent;
            }
        }

        console.log(`Sender: ${sender}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${body}`);

        // Process keywords here
        // Example: if keywords contain certain values, perform actions

    } catch (err) {
        console.log(`Error fetching details for message ID ${message.id}:`, err);
    }
}

function getPlainTextBody(parts) {
    let body = '';

    function findPlainText(parts) {
        for (const part of parts) {
            if (part.mimeType === 'text/plain' && part.body.data) {
                body += Buffer.from(part.body.data, 'base64').toString('utf-8');
            } else if (part.mimeType === 'text/html' && part.body.data) {
                const htmlContent = Buffer.from(part.body.data, 'base64').toString('utf-8');
                body += htmlToText(htmlContent); // Convert HTML to plain text
            } else if (part.parts) {
                findPlainText(part.parts);
            }
        }
    }
    findPlainText(parts);
    return body;
}

async function fetchEmails(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const keywords = {}; // Keywords should be defined based on your requirements

    try {
        const res = await gmail.users.messages.list({
            userId: 'me',
            q: '', // Add search query based on keywords
            maxResults: 10,
        });

        const messages = res.data.messages;
        if (messages && messages.length) {
            console.log('Messages:', messages);

            for (const message of messages) {
                await checkKeywords(gmail, message, keywords);
            }
        } else {
            console.log("No messages found.");
        }
    } catch (err) {
        console.log("API error:", err);
    }
}

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
        console.log('Access Token:', tokens);

        await fetchEmails(oAuth2Client);
    } catch (err) {
        return res.send(`Error retrieving access tokens: ${err}`);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
