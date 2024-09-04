import { AssemblyAIService, OpenAIService } from './TranscriptionService.js';
import dotenv from 'dotenv';
dotenv.config();

export type ServiceType = 'AssemblyAI' | 'OpenAI';

export function createTranscriptionService(type: ServiceType) {
  switch (type) {
    case 'AssemblyAI':
      const assemblyAIKey = process.env.ASSEMBLYAI_API_KEY;
      if (!assemblyAIKey) throw new Error('ASSEMBLYAI_API_KEY is not set in the environment');
      return new AssemblyAIService(assemblyAIKey);
    case 'OpenAI':
      const openAIKey = process.env.OPENAI_API_KEY;
      if (!openAIKey) throw new Error('OPENAI_API_KEY is not set in the environment');
      return new OpenAIService(openAIKey);
    default:
      throw new Error(`Unsupported service type: ${type}`);
  }
}