import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

interface UserInputBoxProps {
  onSendMessage: (message: string) => void;
  className?: string;
}

export function UserInputBox({ onSendMessage, className }: UserInputBoxProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 5 * 24); // 24px is roughly one line height
      textarea.style.height = `${newHeight}px`;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className={cn('relative', className)}>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        className="w-full min-h-[40px] max-h-[120px] p-3 rounded-lg border 
                   border-gray-200 focus:border-blue-500 focus:ring-2 
                   focus:ring-blue-500 focus:outline-none resize-none
                   transition-all duration-200"
        rows={1}
      />
    </div>
  );
} 