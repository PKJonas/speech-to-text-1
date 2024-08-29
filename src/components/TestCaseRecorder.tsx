import React, { useState } from 'react';
import AudioRecorder from './AudioRecorder';

interface TestCaseRecorderProps {
  onTestCaseCreated: (word: string, audioBlob: Blob) => void;
}

const TestCaseRecorder: React.FC<TestCaseRecorderProps> = ({ onTestCaseCreated }) => {
  const [word, setWord] = useState('');
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);

  const handleRecordingComplete = (audioBlob: Blob) => {
    setRecordedAudio(audioBlob);
  };

  const handleSaveTestCase = () => {
    if (word && recordedAudio) {
      onTestCaseCreated(word, recordedAudio);
      setWord('');
      setRecordedAudio(null);
    }
  };

  const handleDownload = () => {
    if (recordedAudio) {
      const url = URL.createObjectURL(recordedAudio);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${word}.webm`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter word"
      />
      <AudioRecorder onRecordingComplete={handleRecordingComplete} />
      {recordedAudio && (
        <>
          <button onClick={handleSaveTestCase}>Save Test Case</button>
          <button onClick={handleDownload}>Download Audio</button>
        </>
      )}
    </div>
  );
};

export default TestCaseRecorder;