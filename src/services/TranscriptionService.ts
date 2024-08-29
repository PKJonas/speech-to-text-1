import { AssemblyAI } from 'assemblyai';

export interface TranscriptionService {
  transcribe(audioFile: File | null): Promise<string>;
}

export class AssemblyAIService implements TranscriptionService {
  private client: AssemblyAI;

  constructor(private apiKey: string) {
    this.client = new AssemblyAI({ apiKey });
  }

  async transcribe(audioFile: File | null): Promise<string> {
    if (!audioFile) {
      throw new Error('No audio file provided');
    }

    try {
      const uploadUrl = await this.client.files.upload(audioFile);

      if (!uploadUrl) {
        throw new Error('Upload failed: No upload URL received');
      }

      const transcript = await this.client.transcripts.transcribe({
        audio_url: uploadUrl,
        language_code: 'lt', // Lithuanian language code
        speech_model: 'nano' // Specify the 'nano' speech model
      });

      if (!transcript.text) {
        throw new Error('Transcription failed: No text received');
      }

      return transcript.text;
    } catch (error) {
      console.error('AssemblyAI transcription error:', error);
      throw error;
    }
  }
}

// Add other service implementations as needed