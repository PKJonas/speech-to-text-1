import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createTranscriptionService } from '../dist/services/TranscriptionServiceFactory.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.raw({ type: 'audio/wav', limit: '10mb' }));
app.use(cors());

app.post('/api/transcribe', async (req, res) => {
  try {
    if (!req.body || req.body.length === 0) {
      return res.status(400).json({ error: 'No audio data provided' });
    }

    const service = createTranscriptionService('AssemblyAI');
    const transcription = await service.transcribe(Buffer.from(req.body), 'lt');

    res.json({ transcription });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'An error occurred during transcription', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});