import { useState, ChangeEvent, FC } from "react";
import { Message } from "../static/types";
import { BASE_URL } from "../static/config";
import { useSession } from "../context/SessionContext";

interface ChatComponentProps {
  history: Message[];
  step: string;
}

interface SendMsgButtonProps {
  step: string;
  msg: string;
}

const  SendMsgButton: React.FC<SendMsgButtonProps> = ({ step, msg }) => {
  const [loading, setLoading] = useState(false);
  const { session, setSession } = useSession();
  
  const handleClick = async () => {
    setLoading(true);
    try {
      const endpoint = `${BASE_URL}/session/${session.session_id}/call_gen_env/${step}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
          user_msg: msg,
        }),
      });
      const data = await res.json();
      setSession(data.message);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
       <button
          onClick={handleClick}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          {loading ? "Loading" : "Send"}
        </button>
    </div>
  );
};

const ChatComponent: FC<ChatComponentProps> = ({ history, step }) => {
  const [msg, setMsg] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  
  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4">
        {history.map((message, index) => {
          console.log(message.content);
          return (
            <div
              key={index}
              className={`p-4 mb-2 rounded-lg ${
                message.role === "user" ? "bg-gray-300" : "bg-gray-200"
              }`}
            >
              <p>[{message.role}]</p>
              <pre className="whitespace-pre-wrap">
                <code>{message.content}</code>
              </pre>
            </div>
          );
        })}
      </div>
      <div className="p-4 mb-2 bg-gray-100 border-t border-gray-200 flex">
        <input
          type="text"
          value={msg}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
       <SendMsgButton step={step} msg = {msg}/>
      </div>
    </div>
  );
};

export default ChatComponent;
