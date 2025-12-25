import 'dotenv/config';
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const SUBMISSIONS_FILE = path.join(process.cwd(), 'contact_submissions.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Contact endpoint
app.post('/api/contact', async (req, res) => {
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

    let submissions = [];
    try {
      const data = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
      submissions = JSON.parse(data);
    } catch (error) {
      // File doesn't exist or is empty/invalid, start with empty array
      if (error.code !== 'ENOENT') {
         console.warn('Error reading submissions file, starting fresh:', error.message);
      }
    }

    submissions.push(newSubmission);

    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
    console.log('Saved submission to', SUBMISSIONS_FILE);

    res.json({ success: true, message: 'Submission saved successfully' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});