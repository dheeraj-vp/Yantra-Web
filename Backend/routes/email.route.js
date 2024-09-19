import express from 'express';
import { fetchEmails } from '../controllers/email.service';

const router = express.Router();

router.get('/emails', fetchEmails);

export default router;