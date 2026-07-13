import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import SectionHeader from "@/common/header/SectionHeader";
import React from "react";
import WorkflowStep, { WorkflowStepStatus } from "./WorkflowStep";

interface Step {
  title: string;
  description: string;
  status: WorkflowStepStatus;
}

const STEPS: Step[] = [
  {
    title: "Basic Audit Complete",
    description: "Building analysis and renewable recommendations generated",
    status: "complete",
  },
  {
    title: "Service Configuration",
    description: "Select and configure engineering services",
    status: "current",
  },
  {
    title: "System Sizing",
    description: "Complete renewable energy system specifications",
    status: "upcoming",
  },
  {
    title: "Contract & Implementation",
    description: "Review proposal and finalize agreement",
    status: "upcoming",
  },
];

const ImplementationWorkflow: React.FC = () => {
  const handleStart = (title: string) => {
    console.log("Start step →", title);
    // TODO: navigate to the relevant step
  };

  return (
    <CommonBorderWrapper isShadow>
      <SectionHeader size="xl" title="Implementation Workflow" />
      <div className="space-y-4">
        {STEPS.map((step, index) => (
          <WorkflowStep
            key={step.title}
            stepNumber={index + 1}
            title={step.title}
            description={step.description}
            status={step.status}
            onStart={() => handleStart(step.title)}
          />
        ))}
      </div>
    </CommonBorderWrapper>
  );
};

export default ImplementationWorkflow;
