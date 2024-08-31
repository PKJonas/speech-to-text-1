import { AssemblyAI } from 'assemblyai';

export interface TranscriptionService {
  transcribe(audioFile: Buffer | null, languageCode: string): Promise<string>;
}

export class AssemblyAIService implements TranscriptionService {
  private client: AssemblyAI;

  constructor(private apiKey: string) {
    this.client = new AssemblyAI({ apiKey });
  }

  async transcribe(audioBuffer: Buffer | null, languageCode: string): Promise<string> {
    if (!audioBuffer) {
      throw new Error('No audio file provided');
    }

    try {
      const uploadUrl = await this.client.files.upload(audioBuffer);

      if (!uploadUrl) {
        throw new Error('Upload failed: No upload URL received');
      }

      const transcript = await this.client.transcripts.transcribe({
        audio_url: uploadUrl,
        language_code: languageCode,
        speech_model: 'nano'
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