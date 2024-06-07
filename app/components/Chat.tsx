import { useState, ChangeEvent, FC } from 'react';
import { Message } from '../static/types';

interface ChatComponentProps {
  history: Message[];
}

const ChatComponent: FC<ChatComponentProps> = ({ history }) => {
  const [input, setInput] = useState<string>('');



  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4">
        {history.map((message, index) => {
          console.log(message.content)
          return (
            <div
              key={index}
              className={`p-4 mb-2 rounded-lg ${
                message.role === 'user' ? 'bg-gray-300' : 'bg-gray-200'
              }`}
            >
              <p>[{message.role}]</p>
              <pre className="whitespace-pre-wrap">
        <code>{message.content}</code>
      </pre>
              
            </div>
          )
        }
        )}
      </div>
      <div className="p-4 bg-white border-t border-gray-200 flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={() => console.log("click temp")}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
