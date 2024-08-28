import React from 'react';

interface WordDisplayProps {
  word: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word }) => {
  return (
    <div className="word-display">
      <h2>{word}</h2>
    </div>
  );
};

export default WordDisplay;