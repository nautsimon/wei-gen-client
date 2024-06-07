import React, { useState } from "react";
import { BASE_URL } from "../static/config";
interface ActionButtonProps {
  description?: string;
  values?: string;
  uid?: string;
  isNew: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  description,
  values,
  uid,
  isNew,
}) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

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
            uid: uid,
          }),
        });
      }
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : isNew ? "Create Session" : "Load Session"}
      </button>
      {response && <div className="mt-4">{JSON.stringify(response)}</div>}
    </div>
  );
};

const LoadSession = () => {
  const [uid, setUID] = useState<string>("");

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
        <ActionButton uid={uid} isNew={false} />
      </div>{" "}
    </div>
  );
};

// Define the NewSession component
const NewSession = () => {
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
        <ActionButton description={description} values={values} isNew={true} />
      </div>
    </div>
  );
};

// Main component that switches between LoadSession and NewSession
const SessionManager = () => {
  const [activeTab, setActiveTab] = useState("load");

  return (
    <div className="p-4  py-10">
      <nav className="mb-4">
        <button
          onClick={() => setActiveTab("new")}
          className={`px-4 py-2 rounded ${
            activeTab === "new" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          New Session
        </button>
        <button
          onClick={() => setActiveTab("load")}
          className={`px-4 py-2 ml-2 rounded ${
            activeTab === "load" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Load Session
        </button>
      </nav>

      <div className="">
        {activeTab === "load" && <LoadSession />}
        {activeTab === "new" && <NewSession />}
      </div>
    </div>
  );
};

export default SessionManager;
