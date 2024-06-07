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

const DUMMY_MSGS: Message[] = [
  {
    role: "system",
    content: "Session created with id: 12345",
  },
  {
    role: "user",
    content: "I want to create a new session",
  },
  {
    role: "assistant",
    content: "Sure, let me create a new session for you",
  },
];

const DUMMY_GEN: string = `metadata:
author: <User>
info: Automated PCR Workflow for Lab Experiment
version: 0.1

modules:
- name: Barty Liquid Manager
- name: Opentrons OT2
- name: Biometra Analytik TRobot II
- name: URRobotModule
- name: BioTek Epoch2 Plate Reader

flowdef:
- name: Prepare PCR Master Mix
  module: Barty Liquid Manager
  action: mix_components
  args:
    biowater: 10
    reaction_buffer: 1
    dna_polymerase: 0.04
    dntps: 0.2
    gc_enhancer: 1
  locations: {}
  requirements: {}
  dependencies: []
  id: step_<ULID_placeholder>

- name: Dispense Master Mix into Final Plate
  module: Opentrons OT2
  action: dispense
  args:
    volume_per_well: 10
  locations: {}
  requirements: {}
  dependencies:
    - Prepare PCR Master Mix
  id: step_<ULID_placeholder>
  
- name: Add Primers and Template DNA
  module: Opentrons OT2
  action: add_components
  args:
    forward_primers: 0.02
    reverse_primers: 0.02
    template_dna: 0.02
  locations: {}
  requirements: {}
  dependencies:
    - Dispense Master Mix into Final Plate
  id: step_<ULID_placeholder>

- name: Run PCR Cycles
  module: Biometra Analytik TRobot II
  action: run_protocol
  args:
    program: 3
  locations: {}
  requirements: {}
  dependencies:
    - Add Primers and Template DNA
  id: step_<ULID_placeholder>

- name: Sealing the Plate
  module: Biometra Analytik TRobot II
  action: seal_plate
  args:
    temperature: 175
    duration: 20
  locations: {}
  requirements: {}
  dependencies:
    - Run PCR Cycles
  id: step_<ULID_placeholder>

- name: Cool down phase
  module: Biometra Analytik TRobot II
  action: cool_down
  args: {}
  locations: {}
  requirements: {}
  dependencies:
    - Sealing the Plate
  id: step_<ULID_placeholder>
  
- name: Reading and Documenting Results
  module: BioTek Epoch2 Plate Reader
  action: run_assay
  args:
    assay_name: dna_analysis
  locations: {}
  requirements: {}
  dependencies:
    - Cool down phase
  id: step_<ULID_placeholder>

- name: Eject and Dispose of the Used Plate
  module: URRobotModule
  action: dispose_of_plate
  args: {}
  locations: {}
  requirements: {}
  dependencies:
    - Reading and Documenting Results
  id: step_<ULD_placeholder>

- name: Analyze the Collected Data
  module: BioTek Epoch2 Plate Reader
  action: data_analysis
  args: {}
  locations: {}
  requirements: {}
  dependencies:
    - Reading and Documenting Results
  id: step_<ULID_placeholder>
`;

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
