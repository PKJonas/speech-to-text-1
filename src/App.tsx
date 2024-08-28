import React, { useState, useEffect } from 'react';
import './App.css';
import MicrophoneAccess from './components/MicrophoneAccess';
import WordDisplay from './components/WordDisplay';
import LiveTranscription from './components/LiveTranscription';

const ASSEMBLY_AI_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key

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

  return (
    <main>
      <h1>Learn to Read</h1>
      <MicrophoneAccess />
      <WordDisplay word={currentWord} />
      {showTranscription && <LiveTranscription text={transcription} />}
      <button onClick={toggleTranscription}>
        {showTranscription ? 'Hide' : 'Show'} Transcription
      </button>
    </main>
  );
}