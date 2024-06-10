import React, { useState, useEffect } from "react";
import { BASE_URL } from "../static/config";
import { ParentProps } from "../static/types";
import { useSession } from "../context/SessionContext";

interface SessionProps {
  setTab: any;
}

interface ActionButtonProps {
  description?: string;
  values?: string;
  uid?: string;
  isNew: boolean;
  setTab: any;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  description,
  values,
  uid,
  isNew,
  setTab,
}) => {
  const [loading, setLoading] = useState(false);
  const { setSession } = useSession();
  const handleClick = async () => {
    if ((description === null && values === null) || uid === null) {
      console.error("Description or values cannot be null");
      return;
    }

    setLoading(true);
    try {
      var res;
      if (isNew) {
        res = await fetch(BASE_URL + "/session/init", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_description: description,
            user_values: values,
          }),
        });
      } else {
        res = await fetch(BASE_URL + "/session/init", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: uid,
          }),
        });
      }
      const data = await res.json();
      setSession(data.message);
      let storedUIDs = getStoredUIDs();
      const newUID = data.message.session_id;
      if (!storedUIDs.includes(newUID)) {
        storedUIDs.push(newUID);
        localStorage.setItem("sessionUID", JSON.stringify(storedUIDs));
      }
      setTab();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStoredUIDs = () => {
    const storedUIDs = localStorage.getItem("sessionUID");
    return storedUIDs ? JSON.parse(storedUIDs) : [];
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white p-2 rounded w-fit"
        disabled={loading}
      >
        {loading ? "Loading..." : isNew ? "Create Session" : "Load Session"}
      </button>
      <div className="w-full center-text">
        {loading && <i>(this will take 30 - 60 seconds)</i>}
      </div>
    </div>
  );
};

const CurrentSession = () => {
  const { session } = useSession();
  const uid = session?.session_id;
  console.log("Session", session);
  return (
    <div>
      <div className="flex w-full">
        <div className="w-full py-2">
          <h1 className="title">
            {!uid || uid.length === 0
              ? "no session, load or create a new session"
              : "Current session loaded (save this for later): " + uid}
          </h1>
          {!uid || uid.length === 0 ? null : (
            <div className="flex w-fill">
              <div className="w-1/2 py-2">
                <p>Description</p>
                <textarea
                  value={session?.original_user_description}
                  disabled
                  className="border rounded w-full h-32 p-2"
                />
              </div>
              <div className="w-1/2 p-2">
                <p>Values</p>
                <textarea
                  value={session?.original_user_values}
                  disabled
                  className="border rounded w-full h-32 p-2"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PreviousSessions: React.FC<SessionProps> = ({ setTab }) => {
  const [previousSessions, setPreviousSessions] = useState<string[]>([]);

  useEffect(() => {
    const storedUIDs = localStorage.getItem("sessionUID");
    if (storedUIDs) {
      setPreviousSessions(JSON.parse(storedUIDs));
    }
  }, []);

  return (
    <div>
      <h1 className="title">Previous Sessions</h1>
      <ul>
        {previousSessions.map((uid, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            <span>{uid}</span>
            <ActionButton uid={uid} isNew={false} setTab={setTab} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const LoadSession: React.FC<SessionProps> = ({ setTab }) => {
  const [uid, setUID] = useState<string>("");
  const { session } = useSession();
  useEffect(() => {
    setUID(session?.session_id || uid);
  }, [session]);

  const handleUIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUID(e.target.value);
  };

  return (
    <div>
      <div className="flex w-full">
        <div className="w-full py-2">
          <p>Enter your UID below</p>
          <input
            type="text"
            value={uid}
            onChange={handleUIDChange}
            className="border rounded w-full p-2"
            placeholder="Enter your uid"
          />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <ActionButton uid={uid} isNew={false} setTab={setTab} />
      </div>
    </div>
  );
};

// Define the NewSession component
const NewSession: React.FC<SessionProps> = ({ setTab }) => {
  const [description, setDescription] = useState("");
  const [values, setValues] = useState("");

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleValuesChange = (e: any) => {
    setValues(e.target.value);
  };

  return (
    <div>
      {/* Your New Session content here */}
      <div className="flex w-fill">
        <div className="w-1/2 py-2">
          <p>Description</p>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="border rounded w-full h-32 p-2"
            placeholder="Enter experiment description here"
          />
        </div>
        <div className="w-1/2 p-2">
          <p>Values</p>
          <textarea
            value={values}
            onChange={handleValuesChange}
            className="border rounded w-full h-32 p-2"
            placeholder="Enter config values here"
          />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <ActionButton
          description={description}
          values={values}
          isNew={true}
          setTab={setTab}
        />
      </div>
    </div>
  );
};

// Main component that switches between LoadSession and NewSession
const SessionManager = () => {
  const [activeTab, setActiveTab] = useState("load");
  const setTab = () => {
    setActiveTab("current");
  };
  return (
    <div className="p-4  py-10">
      <nav className="mb-4">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-4 py-2 rounded ${
            activeTab === "current"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Current Session
        </button>
        <button
          onClick={() => setActiveTab("new")}
          className={`px-4 py-2 ml-2  rounded ${
            activeTab === "new"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          New Session
        </button>
        <button
          onClick={() => setActiveTab("load")}
          className={`px-4 py-2 ml-2 rounded ${
            activeTab === "load"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Load Session
        </button>
        <button
          onClick={() => setActiveTab("previous")}
          className={`px-4 py-2 ml-2 rounded ${
            activeTab === "previous"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Previous Sessions
        </button>
      </nav>

      <div className="">
        {activeTab === "current" && <CurrentSession />}
        {activeTab === "load" && <LoadSession setTab={setTab} />}
        {activeTab === "new" && <NewSession setTab={setTab} />}
        {activeTab === "previous" && <PreviousSessions setTab={setTab} />}
      </div>
    </div>
  );
};

export default SessionManager;
