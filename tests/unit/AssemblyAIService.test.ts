import { AssemblyAIService } from '../../src/services/TranscriptionService';
import * as musicMetadata from 'music-metadata';

jest.mock('music-metadata', () => ({
  parseBuffer: jest.fn(),
}));

describe('AssemblyAIService', () => {
  let service: AssemblyAIService;

  beforeEach(() => {
    service = new AssemblyAIService('dummy-api-key');
  });

  describe('padAudioIfNeeded', () => {
    it('should pad short audio files, maintain original content, and allow removal of padding', async () => {
      // Mock a short audio file (1 second)
      const shortAudioBuffer = Buffer.from('short audio content');
      (musicMetadata.parseBuffer as jest.Mock).mockResolvedValueOnce({ format: { duration: 1 } });

      // @ts-ignore: Accessing private method for testing
      const paddedBuffer = await service.padAudioIfNeeded(shortAudioBuffer);

      // Check if the original content is preserved at the beginning of the padded buffer
      expect(paddedBuffer.subarray(0, shortAudioBuffer.length).toString()).toBe(shortAudioBuffer.toString());

      // Check if the rest of the buffer is filled with zeros (silence)
      expect(paddedBuffer.subarray(shortAudioBuffer.length).every(byte => byte === 0)).toBe(true);

      // Remove padding and check if the original content is intact
      const unpaddedBuffer = paddedBuffer.subarray(0, shortAudioBuffer.length);
      expect(unpaddedBuffer.toString()).toBe('short audio content');
    });

    it('should not pad audio files longer than the minimum length', async () => {
      // Mock a long audio file (3 seconds)
      const longAudioBuffer = Buffer.from('long audio content');
      (musicMetadata.parseBuffer as jest.Mock).mockResolvedValueOnce({ format: { duration: 3 } });

      // @ts-ignore: Accessing private method for testing
      const paddedBuffer = await service.padAudioIfNeeded(longAudioBuffer);

      // Check if the buffer is unchanged
      expect(paddedBuffer).toBe(longAudioBuffer);
    });
  });
});