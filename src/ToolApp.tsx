import React, { useState, useRef } from 'react';

// This component is for development purposes only.
// It should not be included in the production build.
const ToolApp: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.onstop = handleDownload;
    }
  };

  const handleDownload = () => {
    const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
    const url = URL.createObjectURL(audioBlob);
    const fileName = prompt("Enter a file name for your recording:", "my_recording");
    
    if (fileName) {
      const fullFileName = `${fileName.trim()}.webm`;
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fullFileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }
    chunksRef.current = [];
  };

  return (
    <div>
      <h1>Audio Recording Tool</h1>
      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
    </div>
  );
};

export default ToolApp;