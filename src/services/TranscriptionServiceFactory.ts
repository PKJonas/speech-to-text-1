import { AssemblyAIService } from './TranscriptionService.js';
import dotenv from 'dotenv';
dotenv.config();

export type ServiceType = 'AssemblyAI' | 'OtherService';

export function createTranscriptionService(type: ServiceType) {
  const apiKey = process.env.ASSEMBLYAI_API_KEY;
  if (!apiKey) throw new Error('ASSEMBLYAI_API_KEY is not set in the environment');
  
  switch (type) {
    case 'AssemblyAI':
      return new AssemblyAIService(apiKey);
    default:
      throw new Error(`Unsupported service type: ${type}`);
  }
}