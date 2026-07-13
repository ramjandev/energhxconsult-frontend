import SequenceValidation from "@/components/consumer/standard/validation/resValidation/SequenceValidation";

const ResSequenceValidation = () => {
  return (
    <div>
      <SequenceValidation
        onBackToBiomassSizing={() => console.log("Back to biomass sizing")}
        onContinueToEngineeringReview={() =>
          console.log("Continue to engineering review")
        }
      />
    </div>
  );
};

export default ResSequenceValidation;
