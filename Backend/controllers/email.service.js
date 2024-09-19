import {google} from 'googleapis';
import dotenv from "dotenv";
import fs from "fs";
import express from "express";
import { htmlToText } from 'html-to-text';

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

async function checkKeywords(){

}

function getPlainTextBody(parts) {
    let body = '';

    // Recursive function to find the plain text body in nested parts
    function findPlainText(parts) {
        for (const part of parts) {
            if (part.mimeType === 'text/plain' && part.body.data) {
                body += Buffer.from(part.body.data, 'base64').toString('utf-8');
            } else if (part.parts) {
                // If the part has nested parts, recurse through them
                findPlainText(part.parts);
            }
        }
    }
    findPlainText(parts);
    return body;
}

async function fetchEmails(auth) {                                                                 //this function is gonna be used when the user sign ups
    const gmail = google.gmail({ version: 'v1', auth });                    // we should also as if the user wants query based on wt parameters (sender,subject,body)
    const queryMessages = []
    const keywords = []   //user has to enter the keywords
    try {
        const res = await gmail.users.messages.list({
            userId: 'me',
            q: '',                                                                              //keyword to be added here
            maxResults: 10,                                                                     //number of emails he would want to search for    
        });

        const messages = res.data.messages;
        if (messages && messages.length) {
            console.log('Messages:', messages);

            for (const message of messages) {
                try {
                    const messageId = message.id;
                    const messageDetail = await gmail.users.messages.get({
                        userId: 'me',
                        id: messageId,
                    });

                    const sender = messageDetail.data.payload.headers.find(header => header.name ==='FROM');

                    const subject = messageDetail.data.payload.headers.find(header => header.name === 'Subject')?.value;
                    let body = '';

                    if (messageDetail.data.payload.parts) {
                        // Get only the plain text body, ignoring the HTML part
                        body = getPlainTextBody(messageDetail.data.payload.parts);
                    } else if (messageDetail.data.payload.body.data) {
                        const bodyContent = Buffer.from(messageDetail.data.payload.body.data, 'base64').toString('utf-8');
                        if (messageDetail.data.payload.mimeType === 'text/plain') {
                            body = bodyContent;  // Handle plain text part
                        }
                    }

                    console.log(`Sender: ${sender}`);
                    console.log(`Subject: ${subject}`);                                                                             //we should use the sub and body to see if the emails has it,
                    console.log(`Body: ${body}`);                                                                                   // if not it shouldnt be sent to email.model   
                    // if keyword is present in body/sub or sent by specific sender
                    // send the whole message to the to email.model 
                    await checkKeywords()
                } catch (err) {
                    console.log(`Error fetching details for message ID ${message.id}:`, err);
                }
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
// key value pair for keywords itself, if the key is sender then it shud go to the sender functions and search for its value given..but when sent to email.model 
// it should store it in sender table