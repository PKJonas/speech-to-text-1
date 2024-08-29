import React, { useState } from 'react';
import { AssemblyAI, Transcript } from 'assemblyai';

interface FileTranscriptionProps {
  apiKey: string;
  onTranscriptionComplete: (text: string) => void;
}

const FileTranscription: React.FC<FileTranscriptionProps> = ({ apiKey, onTranscriptionComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleTranscribe = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setIsTranscribing(true);
    setError(null);

    const client = new AssemblyAI({
      apiKey: apiKey,
    });

    try {
      // First, upload the file
      const uploadUrl: string = await client.files.upload(file);

      // Then, transcribe the uploaded file
      const transcript: Transcript = await client.transcripts.transcribe({
        audio_url: uploadUrl,
        language_code: 'lt', // Lithuanian language code
      });

      // Access the transcript text
      if (transcript.text) {
        onTranscriptionComplete(transcript.text);
      } else {
        setError('Transcription completed, but no text was generated.');
      }
    } catch (err) {
      console.error('Transcription error:', err);
      setError('An error occurred during transcription. Please try again.');
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleTranscribe} disabled={isTranscribing || !file}>
        {isTranscribing ? 'Transcribing...' : 'Transcribe'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileTranscription;