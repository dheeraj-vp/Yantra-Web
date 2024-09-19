import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
    user: process.env.DB_HOST,
    host: process.env.DB_HOST,
    database:"", //db name
    password:"",
    port: parseInt(process.env.DB_PORT,5),
});
db.connect();

export default db;