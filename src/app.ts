import express from 'express';
import multer from 'multer';
import { AssemblyAI } from 'assemblyai';
import cors from 'cors';

export function createApp(assemblyAIInstance: AssemblyAI) {
  const app = express();
  const upload = multer({ dest: 'uploads/' });

  app.use(express.json());
  app.use(cors());

  app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'No audio file provided' });
      }

      const uploadUrl = await assemblyAIInstance.files.upload(file.path);
      const transcript = await assemblyAIInstance.transcripts.transcribe({
        audio_url: uploadUrl,
        language_code: 'lt',
        speech_model: 'nano'
      });

      res.json({ text: transcript.text });
    } catch (error) {
      console.error('Transcription error:', error);
      res.status(500).json({ error: 'Transcription failed' });
    }
  });

  return app;
}