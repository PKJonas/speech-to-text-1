import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createTranscriptionService } from '../dist/services/TranscriptionServiceFactory.js';

dotenv.config();

// TODO: split expected results by service
describe('Transcription Service Integration Tests', () => {
  const testCases = [
    { file: 'labas.webm', language: 'Lithuanian', expectedText: 'labas', languageCode: 'lt' },
    { file: 'liūtas.webm', language: 'Lithuanian', expectedText: "liūtas", languageCode: 'lt' },
    { file: 'hello.webm', language: 'English', expectedText: 'hello', languageCode: 'en' },
    { file: 'lion.webm', language: 'English', expectedText: 'lion', languageCode: 'en' },
  ];
//'AssemblyAI', 
  const services = ['OpenAI'];

  services.forEach(serviceType => {
    describe(`${serviceType} Integration Tests`, () => {
      const service = createTranscriptionService(serviceType);

      testCases.forEach(({ file, language, expectedText, languageCode }) => {
        test(`${serviceType} transcription - ${language}`, async () => {
          const audioFilePath = path.join(__dirname, 'test-audio', file);
          const audioBuffer = fs.readFileSync(audioFilePath);

          const transcribedText = await service.transcribe(audioBuffer, languageCode);

          expect(transcribedText.toLowerCase()).toContain(expectedText.toLowerCase());
        }, 60000);
      });
    });
  });
});