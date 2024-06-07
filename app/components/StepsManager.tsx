import React, { useState } from "react";
import StepManager from "./StepManager";
import { Message } from "../static/types";
import { useSession } from "../context/SessionContext";
interface ActionButtonProps {
  description?: string;
  values?: string;
  uid?: string;
  isNew: boolean;
}


const StepsManager = () => {
  const [activeTab, setActiveTab] = useState("framework");
  const { session } = useSession();
  return (
    <div className="p-4 pt-12">
      <nav className="mb-4">
        <button
          onClick={() => setActiveTab("framework")}
          className={`px-4 py-2 rounded ${
            activeTab === "framework" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Framework
        </button>
        <button
          onClick={() => setActiveTab("workflow")}
          disabled={!session?.generated_framework || session?.generated_framework.length === 0}
          className={`px-4 py-2 ml-2 rounded ${
            activeTab === "workflow" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Workflow
        </button>
        <button
          onClick={() => setActiveTab("code")}
          disabled={!session?.generated_workflow || session?.generated_workflow.length === 0}
          className={`px-4 py-2 ml-2 rounded ${
            activeTab === "code" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Code
        </button>
        <button
          onClick={() => setActiveTab("config")}
          disabled={!session?.generated_code || session?.generated_code.length === 0}
          className={`px-4 py-2 ml-2 rounded ${
            activeTab === "config" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Config
        </button>
      </nav>

      <div className="">
        {activeTab === "framework" && (
          <StepManager
            step="framework"
            generated={session?.generated_framework}
            history={session?.framework_agent_ctx}
          />
        )}
        {activeTab === "workflow" && (
          <StepManager
            step="workflow"
            generated={session?.generated_workflow}
            history={session?.workflow_agent_ctx}
          />
        )}
        {activeTab === "code" && (
          <StepManager
            step="code"
            generated={session?.generated_code}
            history={session?.code_agent_ctx}
          />
        )}
        {activeTab === "config" && (
          <StepManager
            step="config"
            generated={session?.generated_config}
            history={session?.config_agent_ctx}
          />
        )}
      </div>
    </div>
  );
};

export default StepsManager;
