import { UserInputBox } from './UserInputBox';

export function ChatInterface() {
  const handleSendMessage = (message: string) => {
    // Handle the message sending logic here
    console.log('Sending message:', message);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat history will go here */}
      <UserInputBox 
        onSendMessage={handleSendMessage}
        className="mt-4"
      />
    </div>
  );
} 