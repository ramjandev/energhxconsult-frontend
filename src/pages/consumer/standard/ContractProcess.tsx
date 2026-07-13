import ContractProposalProcess from "@/components/consumer/standard/contact/process/ContractProposalProcess";
import { useNavigate } from "react-router-dom";

const ContractProcess = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ContractProposalProcess
        onBack={() => navigate("../contract-documents")}
        onProceedToCheckout={() => navigate("../commodity-contract")}
      />
    </div>
  );
};

export default ContractProcess;
