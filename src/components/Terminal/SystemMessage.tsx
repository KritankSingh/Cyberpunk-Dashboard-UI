
import React from 'react';

interface SystemMessageProps {
  children: React.ReactNode;
  type?: 'info' | 'success' | 'error' | 'warning';
  className?: string;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ 
  children, 
  type = 'info',
  className = ""
}) => {
  const getTypeStyles = () => {
    switch(type) {
      case 'success': 
        return 'text-[#0FFF50]';
      case 'error': 
        return 'text-[#FF3333]';
      case 'warning': 
        return 'text-[#FFCC00]';
      default: 
        return 'text-[#00FFDD]';
    }
  };
  
  return (
    <div className={`my-2 ${getTypeStyles()} ${className}`}>
      <span className="mr-2">
        {type === 'info' && '[-]'}
        {type === 'success' && '[+]'}
        {type === 'error' && '[!]'}
        {type === 'warning' && '[?]'}
      </span>
      <span>{children}</span>
    </div>
  );
};

export default SystemMessage;
