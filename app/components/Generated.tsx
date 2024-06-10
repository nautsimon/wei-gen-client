import React from "react";
import CodeBox from "./CodeBox";

interface GeneratedProps {
  generated: string;
  step: string;
  file_ext: string;
}


const Generated: React.FC<GeneratedProps> = ({ generated, step,  file_ext }) => {
  const preprocess = (text: string) => {
    const codeBlockRegex = /```[a-z]*\n([\s\S]*?)```/g;
    const matches = codeBlockRegex.exec(text);
    if (matches && matches[1]) {
      return matches[1];
    }
    return text.replace("\n", "");
  }

  const downloadFile = () => {
    const blob = new Blob([generated], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${step}.${file_ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full py-9 text-left text-sm">
      {!generated || generated.length === 0 ? (
        <i className="text-center ">nothing here yet</i>
        
      ) : (<>
        <button 
        onClick={downloadFile} 
        className="mb-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Download {step}.{file_ext}
      </button>
      
        <CodeBox text={preprocess(generated)} />
        </>
      )}
    </div>
    
  );
};
export default Generated;
