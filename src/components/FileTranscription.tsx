import React, { useState } from 'react';
import { AssemblyAI } from 'assemblyai';

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
      const uploadResponse = await client.files.upload({ file });

      // Then, transcribe the uploaded file
      const transcript = await client.transcripts.create({
        audio: uploadResponse.id,
        language_code: 'lt', // Lithuanian language code
      });

      // Wait for the transcription to complete
      const polledTranscript = await client.transcripts.wait(transcript.id);

      onTranscriptionComplete(polledTranscript.text);
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