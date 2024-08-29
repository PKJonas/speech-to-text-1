import { AssemblyAIService } from './TranscriptionService';

export type ServiceType = 'AssemblyAI' | 'OtherService';

export function createTranscriptionService(type: ServiceType, apiKey: string) {
  switch (type) {
    case 'AssemblyAI':
      return new AssemblyAIService(apiKey);
    // case 'OtherService':
    //   return new OtherService(apiKey);
    default:
      throw new Error(`Unsupported service type: ${type}`);
  }
}