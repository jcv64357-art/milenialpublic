import React, { useState } from 'react';
import { VideoReel } from './components/VideoReel';
import { FormSequence } from './components/FormSequence';

// The two main states of the application
type AppMode = 'VIDEO' | 'FORM';

export default function App() {
  const [mode, setMode] = useState<AppMode>('VIDEO');

  // Callback when the 30s reel ends or user taps to continue
  const handleVideoComplete = () => {
    setMode('FORM');
  };

  return (
    <div className="w-full h-full max-w-[500px] mx-auto bg-[#FDFCF8] relative shadow-2xl overflow-hidden">
      {mode === 'VIDEO' ? (
        <VideoReel onComplete={handleVideoComplete} />
      ) : (
        <FormSequence />
      )}
    </div>
  );
}