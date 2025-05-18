
import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  duration: number;
  label?: string;
  onComplete?: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  duration,
  label = "PROGRESS",
  onComplete
}) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        const newProgress = oldProgress + (100 / (duration / 100));
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [duration]);

  useEffect(() => {
    if (progress >= 100 && onComplete) {
      setTimeout(() => {
        onComplete();
      }, 300);
    }
  }, [progress, onComplete]);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span>{Math.floor(progress)}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
