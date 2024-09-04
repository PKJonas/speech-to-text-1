import { AssemblyAI } from 'assemblyai';
import { Buffer } from 'buffer';
import * as musicMetadata from 'music-metadata';
import OpenAI from 'openai';

export interface TranscriptionService {
  transcribe(audioFile: Buffer | null, languageCode: string): Promise<string>;
}

export class AssemblyAIService implements TranscriptionService {
  private client: AssemblyAI;
  private readonly MIN_AUDIO_LENGTH = 2; // Minimum audio length in seconds

  constructor(private apiKey: string) {
    this.client = new AssemblyAI({ apiKey });
  }

  async transcribe(audioBuffer: Buffer | null, languageCode: string): Promise<string> {
    if (!audioBuffer) {
      throw new Error('No audio file provided');
    }

    try {
      const paddedAudioBuffer = await this.padAudioIfNeeded(audioBuffer);
      const uploadUrl = await this.client.files.upload(paddedAudioBuffer);

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

  private async padAudioIfNeeded(audioBuffer: Buffer): Promise<Buffer> {
    const audioLengthSeconds = await this.getAudioLength(audioBuffer);

    if (audioLengthSeconds >= this.MIN_AUDIO_LENGTH) {
      return audioBuffer;
    }

    const paddingLengthSeconds = this.MIN_AUDIO_LENGTH - audioLengthSeconds;
    const paddingBuffer = Buffer.alloc(Math.ceil(paddingLengthSeconds * 44100) * 2); // Assuming 44.1kHz, 16-bit audio

    return Buffer.concat([audioBuffer, paddingBuffer]);
  }

  private async getAudioLength(audioBuffer: Buffer): Promise<number> {
    try {
      const metadata = await musicMetadata.parseBuffer(audioBuffer);
      return metadata.format.duration || 0;
    } catch (error) {
      console.error('Error parsing audio metadata:', error);
      return 0;
    }
  }
}

export class OpenAIService implements TranscriptionService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async transcribe(audioBuffer: Buffer | null, languageCode: string): Promise<string> {
    if (!audioBuffer) {
      throw new Error('No audio file provided');
    }

    // This is a stub implementation. We'll replace this with actual API call later.
    console.log('OpenAI transcribe called with language:', languageCode);
    return 'OpenAI transcription stub';
  }
}

// Add other service implementations as needed