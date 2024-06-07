import React from "react";
import CodeBox from "./CodeBox";

interface GeneratedProps {
  generated: string;
}

const Generated: React.FC<GeneratedProps> = ({ generated }) => {
  return (
    <div className="w-full py-9 text-left text-sm">
      {generated.length === 0 ? (
        <i className="text-center ">nothing here yet</i>
        
      ) : (
        <CodeBox text={generated} />
      )}
    </div>
  );
};
export default Generated;
