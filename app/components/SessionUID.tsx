import React from "react";

interface SessionUIDProps {
  uid: string;
}

const SessionUID: React.FC<SessionUIDProps> = ({ uid }) => {
  return (
    <div className="w-full  mb-1">
      <h1 className="title">[session id: {" "}
      {uid.length === 0 ? (
        <i>no weigen session loaded, load or create a new session above</i>
      ) : (
        <u>{uid}</u>
      )}
      ]</h1>
    </div>
    
  );
};
export default SessionUID;
