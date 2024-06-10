import React from 'react';

interface CodeBoxProps {
  text: string;
}


const preprocess = (text: string) => {
  return text.replace("\n", "");
}

const CodeBox: React.FC<CodeBoxProps> = ({ text}) => {

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-md">
      <pre className="whitespace-pre-wrap">
        <code>{text}</code>
      </pre>
    </div>
  );
};

export default CodeBox;