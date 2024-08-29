import React, { useState } from 'react';
import AudioRecorder from './AudioRecorder';
import { TranscriptionService, AssemblyAIService } from '../services/TranscriptionService';
import axios from 'axios';

interface MicrophoneTranscriptionProps {
  apiKey: string;
  onTranscriptionComplete: (text: string) => void;
}

const MicrophoneTranscription: React.FC<MicrophoneTranscriptionProps> = ({ apiKey, onTranscriptionComplete }) => {
  const [selectedService, setSelectedService] = useState<string>('AssemblyAI');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    setError(null);

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    try {
      const response = await axios.post('/api/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const transcribedText = response.data.text;
      onTranscriptionComplete(transcribedText);
    } catch (err) {
      console.error('Transcription error:', err);
      setError(`An error occurred during transcription: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsTranscribing(false);
    }
  };

  const getTranscriptionService = (serviceName: string): TranscriptionService => {
    switch (serviceName) {
      case 'AssemblyAI':
        return new AssemblyAIService(apiKey);
      // Add cases for other services as they are implemented
      default:
        throw new Error(`Unsupported transcription service: ${serviceName}`);
    }
  };

  return (
    <div>
      <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
        <option value="AssemblyAI">AssemblyAI</option>
        {/* Add options for other services as they are implemented */}
      </select>
      <AudioRecorder onRecordingComplete={handleRecordingComplete} />
      {isTranscribing && <p>Transcribing...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Add UI for test cases and results here */}
    </div>
  );
};

export default MicrophoneTranscription;