import React from "react";
import { useSession } from '../context/SessionContext';

const SessionUID = () => {
  const { session } = useSession();
  const uid = session?.session_id;
  console.log("SSS", uid)
  return (
    <div className="w-full  mb-1">
      <h1 className="title">[session id: {" "}
      {!uid || uid.length === 0 ? (
        <i>~ no weigen session loaded, load or create a new session below ~</i>
      ) : (
        <u>{uid}</u>
      )}
      ]</h1>
    </div>
    
  );
};
export default SessionUID;
