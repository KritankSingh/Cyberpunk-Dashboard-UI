
import React, { useState, useEffect, useRef } from 'react';
import TerminalHeader from './TerminalHeader';
import TerminalInput from './TerminalInput';
import TypewriterText from './TypewriterText';
import SystemMessage from './SystemMessage';
import ProgressBar from './ProgressBar';
import FileSystem from './FileSystem';
import AsciiArt from './AsciiArt';
import MatrixBackground from './MatrixBackground';

interface OutputLine {
  id: string;
  type: 'command' | 'response' | 'progress' | 'system' | 'ascii';
  content: string;
  systemType?: 'info' | 'success' | 'error' | 'warning';
  asciiType?: 'logo' | 'warning' | 'access' | 'denied';
  progressDuration?: number;
}

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'code' | 'folder' | 'terminal';
  size?: string;
  lastModified?: string;
}

const HackingTerminal: React.FC = () => {
  const [outputLines, setOutputLines] = useState<OutputLine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  
  const files: FileItem[] = [
    { id: '1', name: 'access_codes.dat', type: 'file', size: '2.3KB' },
    { id: '2', name: 'security_override.sh', type: 'code', size: '4.7KB' },
    { id: '3', name: 'classified/', type: 'folder', size: '--' },
    { id: '4', name: 'backdoor.exe', type: 'terminal', size: '8.1KB' },
    { id: '5', name: 'encryption_keys.json', type: 'code', size: '1.2KB' },
    { id: '6', name: 'surveillance.log', type: 'file', size: '12.5KB' }
  ];

  useEffect(() => {
    // Initial boot sequence
    setOutputLines([
      {
        id: '0',
        type: 'ascii',
        content: '',
        asciiType: 'logo'
      },
      {
        id: '1',
        type: 'system',
        content: 'PEGASUS OS v3.4.2 initialized... Establishing secure connection...',
        systemType: 'info'
      },
      {
        id: '2',
        type: 'progress',
        content: 'Connecting to secure network',
        progressDuration: 2000
      }
    ]);
    
    setTimeout(() => {
      addSystemMessage('Connection established. Welcome, Agent.', 'success');
      addSystemMessage('Type "help" for available commands.', 'info');
    }, 2500);
  }, []);
  
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputLines]);

  const handleCommand = (command: string) => {
    const commandId = Date.now().toString();
    
    setOutputLines(prev => [
      ...prev,
      {
        id: commandId,
        type: 'command',
        content: command
      }
    ]);
    
    setIsLoading(true);
    setTimeout(() => {
      processCommand(command);
      setIsLoading(false);
    }, 500);
  };
  
  const addSystemMessage = (message: string, type: 'info' | 'success' | 'error' | 'warning') => {
    const msgId = Date.now().toString();
    
    setOutputLines(prev => [
      ...prev,
      {
        id: msgId,
        type: 'system',
        content: message,
        systemType: type
      }
    ]);
  };

  const processCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
      case 'help':
        addSystemMessage('Available commands:', 'info');
        addSystemMessage('access - Attempt to access the secure system', 'info');
        addSystemMessage('scan - Scan for security vulnerabilities', 'info');
        addSystemMessage('files - List available files', 'info');
        addSystemMessage('decrypt - Attempt to decrypt security protocols', 'info');
        addSystemMessage('clear - Clear the terminal screen', 'info');
        addSystemMessage('exit - Exit the terminal session', 'info');
        break;
        
      case 'access':
        addSystemMessage('Attempting to gain access to secure system...', 'warning');
        setOutputLines(prev => [
          ...prev, 
          {
            id: Date.now().toString(),
            type: 'progress',
            content: 'Bypassing security protocol',
            progressDuration: 3000
          }
        ]);
        
        setTimeout(() => {
          setOutputLines(prev => [
            ...prev,
            {
              id: Date.now().toString(),
              type: 'ascii',
              content: '',
              asciiType: 'denied'
            }
          ]);
          addSystemMessage('Access denied. Security protocol level 5 detected. Additional clearance required.', 'error');
        }, 3500);
        break;
        
      case 'scan':
        addSystemMessage('Initiating system scan...', 'info');
        setOutputLines(prev => [
          ...prev, 
          {
            id: Date.now().toString(),
            type: 'progress',
            content: 'Scanning system',
            progressDuration: 4000
          }
        ]);
        
        setTimeout(() => {
          addSystemMessage('Scan complete. 3 potential security vulnerabilities detected.', 'success');
          addSystemMessage('Vulnerability in main database firewall detected.', 'warning');
          addSystemMessage('Type "decrypt" to attempt exploitation.', 'info');
        }, 4500);
        break;
        
      case 'files':
        addSystemMessage('Retrieving classified files...', 'info');
        setShowFiles(true);
        break;
        
      case 'decrypt':
        addSystemMessage('Initiating decryption sequence...', 'warning');
        setOutputLines(prev => [
          ...prev, 
          {
            id: Date.now().toString(),
            type: 'progress',
            content: 'Decrypting security protocols',
            progressDuration: 5000
          }
        ]);
        
        setTimeout(() => {
          setOutputLines(prev => [
            ...prev,
            {
              id: Date.now().toString(),
              type: 'ascii',
              content: '',
              asciiType: 'access'
            }
          ]);
          addSystemMessage('Decryption successful. Access granted to classified files.', 'success');
          addSystemMessage('Use "files" to browse available classified information.', 'info');
        }, 5500);
        break;
        
      case 'clear':
        setOutputLines([]);
        break;
        
      case 'exit':
        addSystemMessage('Terminating secure connection...', 'warning');
        setOutputLines(prev => [
          ...prev, 
          {
            id: Date.now().toString(),
            type: 'progress',
            content: 'Erasing connection logs',
            progressDuration: 2000
          }
        ]);
        
        setTimeout(() => {
          addSystemMessage('Connection terminated. All traces removed.', 'success');
          setOutputLines(prev => [
            ...prev,
            {
              id: Date.now().toString(),
              type: 'ascii',
              content: 'System shutdown complete.',
              asciiType: 'logo'
            }
          ]);
        }, 2500);
        break;
        
      default:
        addSystemMessage(`Command not recognized: ${command}`, 'error');
        addSystemMessage('Type "help" for available commands.', 'info');
    }
  };

  const handleFileSelect = (file: FileItem) => {
    addSystemMessage(`Accessing file: ${file.name}`, 'info');
    
    if (file.type === 'folder') {
      addSystemMessage('Access denied. Additional permissions required.', 'error');
    } else {
      setOutputLines(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          type: 'progress',
          content: `Loading ${file.name}`,
          progressDuration: 1500
        }
      ]);
      
      setTimeout(() => {
        switch (file.id) {
          case '1':
            addSystemMessage('File contains encrypted access codes. Decryption key required.', 'warning');
            break;
          case '2':
            addSystemMessage('Security override script detected. Administrator privileges required to execute.', 'warning');
            break;
          case '4':
            addSystemMessage('Backdoor program loaded. Ready for deployment on vulnerable systems.', 'success');
            break;
          case '5':
            addSystemMessage('Encryption keys accessed. Use these with caution to avoid detection.', 'warning');
            break;
          case '6':
            addSystemMessage('Surveillance logs accessed. Multiple security cameras and microphones active.', 'info');
            break;
          default:
            addSystemMessage('File contents could not be parsed.', 'error');
        }
      }, 2000);
    }
  };

  const renderOutputLine = (line: OutputLine) => {
    switch (line.type) {
      case 'command':
        return (
          <div key={line.id} className="mb-2">
            <span className="text-[#0FFF50] mr-2">&gt;</span>
            <span>{line.content}</span>
          </div>
        );
      
      case 'response':
        return (
          <div key={line.id} className="mb-2 pl-4">
            <TypewriterText text={line.content} />
          </div>
        );
      
      case 'system':
        return (
          <SystemMessage key={line.id} type={line.systemType || 'info'}>
            <TypewriterText text={line.content} />
          </SystemMessage>
        );
      
      case 'progress':
        return (
          <div key={line.id} className="my-3">
            <ProgressBar 
              duration={line.progressDuration || 2000} 
              label={line.content}
            />
          </div>
        );
      
      case 'ascii':
        return (
          <div key={line.id}>
            <AsciiArt type={line.asciiType || 'logo'} />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0208] p-4 relative">
      <MatrixBackground />
      
      <div className="container mx-auto max-w-5xl">
        <div className="terminal-container relative">
          <div className="absolute inset-0 scanner pointer-events-none"></div>
          <TerminalHeader title="SECURE ACCESS TERMINAL" />
          
          <div
            ref={outputRef}
            className="terminal-output max-h-[60vh] overflow-y-auto scrollbar-hide mb-4"
          >
            {outputLines.map(renderOutputLine)}
            
            {showFiles && (
              <FileSystem 
                files={files}
                onSelectFile={handleFileSelect}
              />
            )}
          </div>
          
          <TerminalInput onCommand={handleCommand} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default HackingTerminal;
