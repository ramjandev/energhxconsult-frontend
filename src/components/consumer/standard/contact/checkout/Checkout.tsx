import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import SectionHeader from "@/common/header/SectionHeader";
import { useState } from "react";
import { ORDER_SUMMARY, PAYMENT_OPTIONS } from "./data";
import OrderSummaryPanel from "./OrderSummaryPanel";
import PaymentInformationForm from "./PaymentInformationForm";
import PaymentOptionCard from "./PaymentOptionCard";
import { PaymentFormData, PaymentMethod } from "./types";

interface CheckoutProps {
  onCompletePurchase: (
    method: PaymentMethod,
    paymentInfo: PaymentFormData,
  ) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onCompletePurchase }) => {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("payInFull");
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardholderName: "",
  });

  const selectedOption = PAYMENT_OPTIONS.find(
    (opt) => opt.id === selectedMethod,
  )!;

  const isFormValid =
    formData.cardNumber.replace(/\s/g, "").length >= 15 &&
    formData.expirationDate.length === 5 &&
    formData.cvv.length >= 3 &&
    formData.cardholderName.trim().length > 0;

  const handleSubmit = () => {
    if (!isFormValid) return;
    onCompletePurchase(selectedMethod, formData);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Checkout"
        description="Complete your renewable energy system purchase"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <CommonBorderWrapper isShadow>
            <SectionHeader size="xl" title="Payment Options" />

            <div className="space-y-4">
              {PAYMENT_OPTIONS.map((option) => (
                <PaymentOptionCard
                  key={option.id}
                  option={option}
                  isSelected={selectedMethod === option.id}
                  onSelect={() => setSelectedMethod(option.id)}
                />
              ))}
            </div>
          </CommonBorderWrapper>

          <PaymentInformationForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            isSubmitDisabled={!isFormValid}
          />
        </div>

        <div className="lg:col-span-1">
          <OrderSummaryPanel
            data={ORDER_SUMMARY}
            selectedOption={selectedOption}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
