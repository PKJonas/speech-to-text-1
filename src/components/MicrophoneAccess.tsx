import React, { useState, useEffect } from 'react';

const MicrophoneAccess: React.FC = () => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasAccess(true);
      // Stop the stream immediately as we don't need it yet
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setHasAccess(false);
    }
  };

  useEffect(() => {
    requestMicrophoneAccess();
  }, []);

  if (hasAccess === null) {
    return <div>Requesting microphone access...</div>;
  }

  if (hasAccess === false) {
    return (
      <div>
        <p>Microphone access denied. Please allow microphone access to use this app.</p>
        <button onClick={requestMicrophoneAccess}>Request Access Again</button>
      </div>
    );
  }

  return <div>Microphone access granted!</div>;
};

export default MicrophoneAccess;