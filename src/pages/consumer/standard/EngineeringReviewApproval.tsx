import ReviewApproval from "@/components/consumer/standard/validation/engineering/ReviewApproval";

const EngineeringReviewApproval = () => {
  return (
    <div>
      <ReviewApproval
        onBackToValidation={() => console.log("Back to validation")}
        onGenerateFinalProposal={() => console.log("Generating final proposal")}
      />
    </div>
  );
};

export default EngineeringReviewApproval;
