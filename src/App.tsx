import React, { useState, useEffect } from 'react';
import './App.css';
import WordDisplay from './components/WordDisplay';
import MicrophoneTranscription from './components/MicrophoneTranscription';
import LiveTranscription from './components/LiveTranscription';

const ASSEMBLY_AI_API_KEY = 'd8c2b5b94aee4e419efd6968b073c7e7';

export default function App() {
  const [currentWord, setCurrentWord] = useState('');
  const [transcription, setTranscription] = useState('');
  const [showTranscription, setShowTranscription] = useState(true);

  useEffect(() => {
    // TODO: Implement word selection logic
    setCurrentWord('LIŪTAS');
  }, []);

  const toggleTranscription = () => {
    setShowTranscription(!showTranscription);
  };

  const handleTranscriptionComplete = (text: string) => {
    console.log('Transcription complete:', text);
    setTranscription(text);
  };

  return (
    <main>
      <h1>Learn to Read</h1>
      <WordDisplay word={currentWord} />
      <MicrophoneTranscription 
        apiKey={ASSEMBLY_AI_API_KEY} 
        onTranscriptionComplete={handleTranscriptionComplete} 
      />
      {showTranscription && <LiveTranscription text={transcription} />}
      <button onClick={toggleTranscription}>
        {showTranscription ? 'Hide' : 'Show'} Transcription
      </button>
    </main>
  );
}