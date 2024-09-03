import React, { useState, useRef } from 'react';

interface Props {
  onTranscriptionComplete: (text: string) => void;
}

const MicrophoneTranscription: React.FC<Props> = ({ onTranscriptionComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [canPlayback, setCanPlayback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startRecording = async () => {
    try {
      console.log('Starting recording...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Got media stream');
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      setMediaRecorder(recorder);

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        console.log('Data available', e.data.size);
        chunks.push(e.data);
      };
      recorder.onstop = async () => {
        console.log('Recording stopped');
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setCanPlayback(true);
        await sendAudioToServer(audioBlob);
      };

      recorder.start();
      setIsRecording(true);
      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      console.log('Stopping recording...');
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
    }
  };

  const handlePlayback = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <button onClick={() => {
        console.log('Button clicked');
        isRecording ? stopRecording() : startRecording();
      }}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <audio ref={audioRef} src={audioUrl || undefined} onEnded={() => setIsPlaying(false)} />
      <button
        onClick={handlePlayback}
        disabled={!canPlayback}
      >
        {isPlaying ? 'Stop Playback' : 'Play Recording'}
      </button>
    </div>
  );
};

export default MicrophoneTranscription;