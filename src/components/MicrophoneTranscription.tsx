import React, { useState } from 'react';

interface Props {
  onTranscriptionComplete: (text: string) => void;
}

const MicrophoneTranscription: React.FC<Props> = ({ onTranscriptionComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    setMediaRecorder(recorder);

    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      await sendAudioToServer(audioBlob);
    };

    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToServer = async (audioBlob: Blob) => {
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'audio/webm',
        },
        body: arrayBuffer,
      });

      const text = await response.text();
      console.log('Server response:', text);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, response: ${text}`);
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Server response is not valid JSON:', text);
        throw new Error(`Invalid JSON response from server: ${text}`);
      }

      onTranscriptionComplete(data.transcription);
    } catch (error: unknown) {
      console.error('Error sending audio to server:', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        response: (error as any).response,
      });
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default MicrophoneTranscription;