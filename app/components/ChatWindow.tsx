import React from 'react';

const ChatWindow = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-auto p-4">
        {/* Messages will go here */}
        <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md space-x-4">
          <div className="text-xl font-medium text-black">Welcome to WEI Gen!</div>
          <p className="text-gray-500">Your messages will appear here.</p>
        </div>
      </div>
      <div className="p-4">
        {/* Input field will go here */}
        <input
          type="text"
          className="w-full p-4 rounded-lg shadow-sm border-gray-300"
          placeholder="Type your message here..."
        />
      </div>
    </div>
  );
};

export default ChatWindow;
