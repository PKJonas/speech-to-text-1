import React, { useEffect, useRef, useState } from 'react';

interface AssemblyAITranscriptionProps {
  apiKey: string;
  onTranscriptionUpdate: (text: string) => void;
}

const AssemblyAITranscription: React.FC<AssemblyAITranscriptionProps> = ({ apiKey, onTranscriptionUpdate }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      socketRef.current = new WebSocket('wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000');

      socketRef.current.onopen = () => {
        console.log('WebSocket connection opened');
        socketRef.current?.send(JSON.stringify({ auth_token: apiKey }));
      };

      socketRef.current.onmessage = (message) => {
        const res = JSON.parse(message.data);
        console.log('Received message:', res);
        if (res.message_type === 'FinalTranscript') {
          onTranscriptionUpdate(res.text);
        } else if (res.message_type === 'Error') {
          setError(`AssemblyAI Error: ${res.error}`);
          console.error('AssemblyAI Error:', res.error);
          stopRecording();
        }
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket Error:', error);
        setError('WebSocket connection error');
      };

      socketRef.current.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
        if (!event.wasClean) {
          setError(`WebSocket connection closed unexpectedly: ${event.reason}`);
        }
      };

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(event.data);
        }
      };

      mediaRecorderRef.current.start(250);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      setError(`Error starting recording: ${error}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (socketRef.current) {
      socketRef.current.close();
    }
    setIsRecording(false);
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AssemblyAITranscription;