
import React, { useState, useRef, useEffect } from 'react';

interface TerminalInputProps {
  onCommand: (command: string) => void;
  disabled?: boolean;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ onCommand, disabled = false }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onCommand(inputValue);
      setInputValue('');
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div onClick={focusInput} className="flex items-center mt-2">
      <span className="text-[#0FFF50] mr-2">&gt;</span>
      <form onSubmit={handleSubmit} className="flex-1">
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="terminal-input flex-1"
            placeholder={disabled ? "" : "Enter command..."}
            disabled={disabled}
            autoComplete="off"
            spellCheck="false"
          />
          <span 
            className="terminal-cursor" 
            style={{ opacity: cursorVisible && !disabled ? 1 : 0 }}
          />
        </div>
      </form>
    </div>
  );
};

export default TerminalInput;
