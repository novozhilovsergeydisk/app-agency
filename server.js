import 'dotenv/config';
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 3000;
const SUBMISSIONS_FILE = path.join(process.cwd(), 'contact_submissions.json');

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disabled to avoid issues with inline scripts/styles in development
}));
app.disable('x-powered-by');

// Rate limiting for API
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 50, // Limit each IP to 50 requests per windowMs
	standardHeaders: 'draft-7',
	legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'dist')));

// Contact endpoint
app.post('/api/contact', apiLimiter, async (req, res) => {
  console.log('Received contact request body:', req.body);
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const newSubmission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name,
      email,
      phone: phone || 'Not provided',
      message
    };

    // Append the new submission as a single line JSON string
    await fs.appendFile(SUBMISSIONS_FILE, JSON.stringify(newSubmission) + '\n');
    console.log('Saved submission to', SUBMISSIONS_FILE);

    res.json({ success: true, message: 'Submission saved successfully' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});