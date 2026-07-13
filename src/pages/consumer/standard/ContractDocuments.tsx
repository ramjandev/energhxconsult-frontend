import ContractDocumentsReview from "@/components/consumer/standard/contact/report/ContractDocumentsReview";
import { useNavigate } from "react-router-dom";

const ContractDocuments = () => {
  const navigate = useNavigate();
  return (
    <ContractDocumentsReview
      onBackToProposal={() => navigate("../project-proposal")}
      onExecuteContract={() => navigate("../contract-process")}
    />
  );
};

export default ContractDocuments;
