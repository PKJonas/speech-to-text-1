import React from 'react';

interface LiveTranscriptionProps {
  text: string;
}

const LiveTranscription: React.FC<LiveTranscriptionProps> = ({ text }) => {
  return (
    <div className="live-transcription">
      <p>{text || 'Listening...'}</p>
    </div>
  );
};

export default LiveTranscription;