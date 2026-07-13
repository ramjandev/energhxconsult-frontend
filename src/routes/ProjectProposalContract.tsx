import ProjectProposal from "@/components/consumer/standard/contact/proposal/ProjectProposal";
import { useNavigate } from "react-router-dom";

const ProjectProposalContract = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ProjectProposal
        onBackToSystemSizing={() => console.log("Back to system sizing")}
        onDownloadProposalPdf={() => console.log("Download proposal PDF")}
        onApproveAndContinue={() => navigate("../contract-documents")}
      />
    </div>
  );
};

export default ProjectProposalContract;
