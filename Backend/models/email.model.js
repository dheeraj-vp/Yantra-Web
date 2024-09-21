import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
    user: process.env.DB_HOST,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE, 
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT,5),
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

//DB keywords Query
async function keywordsQuery(sender,subject,body){
    sender ? sender :  NULL ;
    subject ? subject :  NULL ;
    body ? body :  NULL ;
    await db.query("INSERT INTO userKeywords (sender,subject,body) VALUE ($1,$2,$3)",[sender,subject,body]);
}

async function senderBodySubject(sender, messageId, subject) {
    await db.query("INSERT INTO senderBodySubject (sender, messageId, subject) VALUES ($1, $2, $3)", [sender, messageId, subject]);
}

async function senderSubject(sender, messageId, subject) {
    await db.query("INSERT INTO senderSubject (sender, messageId, subject) VALUES ($1, $2, $3)", [sender, messageId, subject]);
}

async function bodySubject(sender, messageId, subject) {
    await db.query("INSERT INTO bodySubject (sender, messageId, subject) VALUES ($1, $2, $3)", [sender, messageId, subject]);
}

async function senderBody(sender, messageId, subject) {
    await db.query("INSERT INTO senderBody (sender, messageId, subject) VALUES ($1, $2, $3)", [sender, messageId, subject]);
}

async function Sender(sender, messageId, subject) {
    await db.query("INSERT INTO sender (sender, messageId, subject) VALUES ($1, $2, $3)", [sender, messageId, subject]);
}

async function Subject(sender, messageId, subject) {
    await db.query("INSERT INTO subject (sender, messageId, subject) VALUES ($1, $2, $3)", [sender, messageId, subject]);
}

async function Body(sender, messageId, subject) {
    await db.query("INSERT INTO body (sender, messageId, subject) VALUES ($1, $2, $3)", [sender, messageId, subject]);
}


export default {senderBodySubject,senderSubject,bodySubject,senderBody,Sender,Subject,Body,keywordsQuery};