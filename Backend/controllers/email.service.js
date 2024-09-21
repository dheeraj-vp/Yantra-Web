import { google } from 'googleapis';
import dotenv from "dotenv";
import fs from "fs";
import express from "express";
import { htmlToText } from 'html-to-text'; // Include html-to-text
import {senderSubjectBody,senderSubject,bodySubject,senderBody,Sender,Subject,Body,keywordsQuery} from '../models/email.model';

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

async function addKeywords(sender,body,subject){
    //DB keywords Query
    keywordsQuery(sender,body,subject);
}

async function getPlainTextBody(parts) {
    let body = '';

    if (!parts) {
        return body;  // Return empty body if parts are undefined
    }

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
        const conditions = [
            sender.includes(keywords.sender) ? 'SENDER' : '',
            body.includes(keywords.body) ? 'BODY' : '',
            subject.includes(keywords.subject) ? 'SUBJECT' : ''
        ];

        const conditionKey = conditions.filter(Boolean).join('_');

        switch (conditionKey) {
            case 'SENDER_BODY_SUBJECT':
                console.log('Matched sender, body, and subject');
                senderSubjectBody(sender,messageId,subject)
                break;
            case 'SENDER_SUBJECT':
                console.log('Matched sender and subject');
                senderSubject(sender,messageId,subject)
                break;
            case 'BODY_SUBJECT':
                console.log('Matched body and subject');
                subjectBody(sender,messageId,subject)
                break;
            case 'SENDER_BODY':
                console.log('Matched sender and body');
                senderBody(sender,messageId,subject)
                break;
            case 'SENDER':
                console.log('Matched sender');
                Sender(sender,messageId,subject)
                break;
            case 'SUBJECT':
                console.log('Matched subject');
                Subject(sender,messageId,subject)
                break;
            case 'BODY':
                console.log('Matched body');
                Body(sender,messageId,subject)
                break;
            default:
                console.log('No match');
                break;
        }
    } catch (err) {
        console.log(`Error fetching details for message ID ${message.id}:`, err);
    }
}

async function fetchEmails(auth) {

    const keywords = {sender:"",subject:"",body:""}; // Keywords should be defined based on your requirements
    addKeywords(keywords.sender, keywords.body, keywords.subject);//add these keywords in table

    const gmail = google.gmail({ version: 'v1', auth });

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
            console.error(`Error fetching details for message ID ${message.id}:`, err); 
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
