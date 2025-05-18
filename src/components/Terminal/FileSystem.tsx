
import React from 'react';
import { File, FileCode, FolderLock, Terminal as TerminalIcon } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'code' | 'folder' | 'terminal';
  size?: string;
  lastModified?: string;
}

interface FileSystemProps {
  files: FileItem[];
  onSelectFile: (file: FileItem) => void;
}

const FileSystem: React.FC<FileSystemProps> = ({ files, onSelectFile }) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <FileCode size={14} className="text-[#00FFDD]" />;
      case 'folder':
        return <FolderLock size={14} className="text-[#FFCC00]" />;
      case 'terminal':
        return <TerminalIcon size={14} className="text-[#FF3333]" />;
      default:
        return <File size={14} />;
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs opacity-70 mb-1 px-2">
        <span>NAME</span>
        <span>SIZE</span>
      </div>
      <div className="border border-[#0FFF50]/30 rounded bg-[#0D0208]/70">
        {files.map((file) => (
          <div 
            key={file.id}
            className="file-item text-xs"
            onClick={() => onSelectFile(file)}
          >
            <div className="flex items-center">
              {getFileIcon(file.type)}
              <span className="ml-2">{file.name}</span>
            </div>
            <div className="opacity-70">{file.size}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileSystem;
