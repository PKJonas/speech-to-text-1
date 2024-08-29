import { AssemblyAI } from 'assemblyai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createTranscriptionService } from '../src/services/TranscriptionServiceFactory.js';

dotenv.config();

describe('Transcription Service Integration Tests', () => {
  const testCases = [
    { file: 'test-word-lt.mp3', language: 'Lithuanian', expectedText: 'labas' },
    { file: 'test-word-en.mp3', language: 'English', expectedText: 'hello' },
    // Add more test cases as needed
  ];

  const services = ['AssemblyAI']; // Add more services as you implement them

  services.forEach(serviceType => {
    describe(`${serviceType} Integration Tests`, () => {
      const service = createTranscriptionService(serviceType, process.env[`${serviceType.toUpperCase()}_API_KEY`]);

      testCases.forEach(({ file, language, expectedText }) => {
        test(`${serviceType} transcription - ${language}`, async () => {
          const audioFilePath = path.join(__dirname, 'test-audio', file);
          const audioFile = new File([fs.readFileSync(audioFilePath)], file, { type: 'audio/mpeg' });

          const transcribedText = await service.transcribe(audioFile);

          expect(transcribedText.toLowerCase()).toContain(expectedText.toLowerCase());
        }, 30000); // Increase timeout for API call
      });
    });
  });

  test('Error handling - No audio file', async () => {
    const service = createTranscriptionService('AssemblyAI', process.env.ASSEMBLYAI_API_KEY);
    
    await expect(service.transcribe(null)).rejects.toThrow('No audio file provided');
  });
});