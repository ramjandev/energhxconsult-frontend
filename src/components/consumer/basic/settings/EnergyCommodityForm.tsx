import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/button/CommonSelect";
import SectionHeader from "@/common/header/SectionHeader";
import { inputClass } from "@/pages/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const ELECTRICITY_PROVIDERS = [
  { label: "EKEDC", value: "ekedc" },
  { label: "ConEdison", value: "coned" },
  { label: "National Grid", value: "ng" },
];

const GAS_PROVIDERS = [
  { label: "Nigerian Gas Company", value: "ngc" },
  { label: "SEPLAT", value: "seplat" },
  { label: "Oando Gas", value: "oando" },
];

const formSchema = z.object({
  electricityProvider: z
    .string()
    .nonempty("Please select an electricity provider"),
  gasProvider: z.string().nonempty("Please select a gas provider"),
});

type FormData = z.infer<typeof formSchema>;

const EnergyCommodityForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      electricityProvider: "",
      gasProvider: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Save commodity info →", data);
    // TODO: dispatch / API call
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <SectionHeader
          size="xl"
          title="Energy Commodity Information"
          description="Configure your energy provider and rate information
"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={inputClass.label}>Electricity Provider</label>
          <Controller
            control={control}
            name="electricityProvider"
            render={({ field }) => (
              <CommonSelect
                value={field.value}
                onValueChange={field.onChange}
                item={ELECTRICITY_PROVIDERS}
                placeholder="Select Provider"
                className="w-full"
              />
            )}
          />
          {errors.electricityProvider && (
            <p className={inputClass.error}>
              {errors.electricityProvider.message}
            </p>
          )}
        </div>

        <div>
          <label className={inputClass.label}>Gas Provider</label>
          <Controller
            control={control}
            name="gasProvider"
            render={({ field }) => (
              <CommonSelect
                value={field.value}
                onValueChange={field.onChange}
                item={GAS_PROVIDERS}
                placeholder="Select Provider"
                className="w-full"
              />
            )}
          />
          {errors.gasProvider && (
            <p className={inputClass.error}>{errors.gasProvider.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <CommonButton type="button" variant="outline">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Custom Provider
        </CommonButton>
        <CommonButton type="submit">Save Commodity Info</CommonButton>
      </div>
    </form>
  );
};

export default EnergyCommodityForm;
