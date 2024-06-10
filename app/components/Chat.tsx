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
  loading: boolean;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


interface UseButtonProps {
  step: string;
  msg: string;
}
const SendMsgButton: React.FC<SendMsgButtonProps> = ({ step, msg, loading, setMsg, setLoading }) => {
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
      setMsg(""); // Reset the input field
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
        className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        {loading ? "Loading..." : "Send"}
      </button>
    </div>
  );
};

const UseCodeButton: React.FC<UseButtonProps> = ({ step, msg }) => {
  const { session, setSession } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      const endpoint = `${BASE_URL}/session/${session.session_id}/update_generated/${step}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_generated: msg,
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
      <button
        onClick={handleClick}
        className="absolute top-2 right-2 bg-blue-500 text-white p-1 text-xs rounded hover:bg-blue-700"

      >
        {loading ? "Loading..." : (msg === session["generated_" +step] ? "Selected" : "Use this code")}
      </button>
  );
};

const ChatComponent: FC<ChatComponentProps> = ({ history, step }) => {
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  return (
    <div className="flex flex-col h-[800px]">
      <div className="flex-1 overflow-y-auto p-4">
        {history.map((message, index) => (
          <div
            key={index}
            className={`relative p-4 mb-2 rounded-lg ${
              message.role === "user" ? "bg-gray-300" : "bg-gray-200"
            }`}
          >
            <p>[{message.role}]</p>
            <pre className="whitespace-pre-wrap">
              <code>{message.content}</code>
            </pre>
            {message.role == "assistant" ?
            <UseCodeButton step={step} msg={message.content} />
            : null}
          </div>
        ))}
      </div>
      <div className="p-4 mb-2 bg-gray-100 border-t border-gray-200 flex">
        <input
          type="text"
          value={msg}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          disabled={loading} // Disable the input while loading
        />
        <SendMsgButton step={step} msg={msg} loading={loading} setMsg={setMsg} setLoading={setLoading} />
      </div>
    </div>
  );
};

export default ChatComponent;
