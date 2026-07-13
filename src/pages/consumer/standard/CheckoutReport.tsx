import Checkout from "@/components/consumer/standard/contact/checkout/Checkout";
import {
  PaymentFormData,
  PaymentMethod,
} from "@/components/consumer/standard/contact/checkout/types";

const CheckoutReport = () => {
  return (
    <div>
      <Checkout
        onCompletePurchase={(
          method: PaymentMethod,
          paymentInfo: PaymentFormData,
        ) => console.log("Purchase completed:", { method, paymentInfo })}
      />
    </div>
  );
};

export default CheckoutReport;
