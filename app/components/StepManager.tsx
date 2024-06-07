import { useState } from "react";
import Chat from "./Chat";
import Generated from "./Generated";
import { Message } from "../static/types";
interface StepManagerProps {
  step: string;
  history: Message[];
  generated: string;
  executeCall?: any;
}

const StepManager: React.FC<StepManagerProps> = ({
  step,
  history,
  generated,
  executeCall,
}) => {
  const [isCode, setIsCode] = useState(true);

  const toggleSwitch = () => {
    setIsCode(!isCode);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">{step.charAt(0).toUpperCase() + step.slice(1)}</h1>
      <div className="flex items-center mb-4">
      <span className="mr-2">Code</span>
      <div className="relative inline-block w-10 mr-2 align-middle select-none">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 ${isCode ? 'transform translate-x-0' : 'transform translate-x-4'}`}
          onChange={toggleSwitch}
          checked={!isCode}
        />
        <label
          htmlFor="toggle"
          className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${isCode ? 'bg-gray-300' : 'bg-green-500'}`}
        ></label>
      </div>
      <span className="ml-2">Chat</span>
    </div>
     
        {isCode ?  <Generated generated={generated}/> :  <Chat history={history}/>}
    </div>
  );
};

export default StepManager;
