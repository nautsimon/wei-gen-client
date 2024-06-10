import { useState } from "react";
import Chat from "./Chat";
import Generated from "./Generated";
import { Message } from "../static/types";
import { useSession } from "../context/SessionContext";
import { BASE_URL, STEPS } from "../static/config";
interface StepManagerProps {
  step: string;
  history: Message[];
  generated: string;
}

interface GenerateButtonProps {
  step: string;
}

const step_to_language: Record<string, string> = {
  "framework": "md",
  "workflow": "yaml",
  "code": "py",
  "config": "yaml",
};

const GenerateButton: React.FC<GenerateButtonProps> = ({ step }) => {
  const [loading, setLoading] = useState(false);
  const { session, setSession } = useSession();
  
  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(BASE_URL + "/session/" + session.session_id + STEPS[step], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        className="bg-blue-500 text-white p-2 rounded w-fit"
        disabled={loading}
      >
        {loading ? "Loading..." : "Generate"}
      </button>
      <div className="w-full center-text">
        {loading && <i>(this will take 30 - 60 seconds)</i>}
      </div>
    </div>
  );
};
const StepManager: React.FC<StepManagerProps> = ({
  step,
  history,
  generated,
}) => {
  const [isCode, setIsCode] = useState(true);

  const toggleSwitch = () => {
    setIsCode(!isCode);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">
        {step.charAt(0).toUpperCase() + step.slice(1)}
      </h1>

      {generated && generated.length > 0 ? (
        <>
          <div className="flex items-center mb-4">
            <span className="mr-2">Code</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 ${
                  isCode ? "transform translate-x-0" : "transform translate-x-4"
                }`}
                onChange={toggleSwitch}
                checked={!isCode}
              />
              <label
                htmlFor="toggle"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  isCode ? "bg-gray-300" : "bg-green-500"
                }`}
              ></label>
            </div>
            <span className="ml-2">Chat</span>
          </div>

          {isCode ? (
            <Generated generated={generated} step={step} file_ext={step_to_language?.[step]}/>
          ) : (
            <Chat history={history} step={step} />
          )}
        </>
      ) : (
        <>
          <p className="mb-4">
            You havn't gotten this far yet, press the button below to generate.
          </p>
          <GenerateButton step={step} />
        </>
      )}
    </div>
  );
};

export default StepManager;
