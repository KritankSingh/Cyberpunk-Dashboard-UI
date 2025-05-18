
import React from 'react';
import { Code } from 'lucide-react';

interface TerminalHeaderProps {
  title: string;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ title }) => {
  return (
    <div className="terminal-header">
      <div className="flex items-center">
        <span className="terminal-button bg-red-500"></span>
        <span className="terminal-button bg-yellow-500"></span>
        <span className="terminal-button bg-green-500"></span>
        <span className="ml-3 text-sm opacity-70">PEGASUS OS v3.4.2</span>
      </div>
      <div className="flex items-center text-xs">
        <Code size={12} className="mr-2" />
        <span>{title}</span>
      </div>
      <div className="text-xs opacity-70">
        ENCRYPTED
      </div>
    </div>
  );
};

export default TerminalHeader;
