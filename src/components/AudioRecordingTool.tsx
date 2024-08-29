import React, { useState } from 'react';
import AudioRecorder from './AudioRecorder';

const AudioRecordingTool: React.FC = () => {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
  };

  const handleDownload = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'recorded_audio.webm';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <h1>Audio Recording Tool</h1>
      <AudioRecorder onRecordingComplete={handleRecordingComplete} />
      {audioBlob && (
        <button onClick={handleDownload}>Download Recorded Audio</button>
      )}
    </div>
  );
};

export default AudioRecordingTool;