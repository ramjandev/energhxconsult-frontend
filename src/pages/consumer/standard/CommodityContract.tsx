import ContractProposalProcess from "@/components/consumer/standard/contact/process/ContractProposalProcess";
import { useNavigate } from "react-router-dom";

const CommodityContract = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ContractProposalProcess
        title="Energy Commodity & Engineering Service Contract"
        description="Review your project proposal and agreement documents"
        onBack={() => navigate("../contract-process")}
        onProceedToCheckout={() => navigate("../checkout-report")}
      />
    </div>
  );
};

export default CommodityContract;
