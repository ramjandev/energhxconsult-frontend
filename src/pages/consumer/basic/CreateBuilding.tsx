import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/button/CommonSelect";
import SectionHeader from "@/common/header/SectionHeader";
import { inputClass } from "@/pages/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const BUILDING_TYPES = [
  { label: "Bungalow", value: "Bungalow" },
  { label: "Apartment", value: "Apartment" },
  { label: "Office", value: "Office" },
  { label: "Educational", value: "Educational" },
  { label: "Commercial", value: "Commercial" },
];

const SUB_BUILDING_TYPES = [
  { label: "Software", value: "Software" },
  { label: "Hardware", value: "Hardware" },
  { label: "Residential", value: "Residential" },
];

const COUNTRIES = [
  { label: "Nigeria", value: "NG" },
  { label: "USA", value: "US" },
  { label: "UK", value: "GB" },
  { label: "Canada", value: "CA" },
  { label: "Germany", value: "DE" },
];

const COMMODITIES = [
  { label: "Electricity", value: "electricity" },
  { label: "Natural Gas", value: "gas" },
  { label: "Water", value: "water" },
];

const UTILITY_COMPANIES = [
  { label: "EKEDC", value: "ekedc" },
  { label: "ConEdison", value: "coned" },
  { label: "National Grid", value: "ng" },
];

const STATES = [
  { label: "State A", value: "a" },
  { label: "State B", value: "b" },
];

const ACCEPT_OPTIONS = [
  { label: "Accept", value: "accept" },
  { label: "Decline", value: "decline" },
];

const commoditySchema = z.object({
  state: z.string().nonempty("Please select a state"),
  commodity: z.string().nonempty("Please select a commodity"),
  accountNumber: z.string().nonempty("Account number is required"),
  accountName: z.string().nonempty("Account name is required"),
  units: z.string().nonempty("Units is required"),
  accept: z.string().nonempty("Please select accept or decline"),
  commCountry: z.string().nonempty("Please select a country"),
  utility: z.string().nonempty("Please select a utility company"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^\+?\d{7,15}$/, "Enter a valid phone number"),
});

const formSchema = z.object({
  name: z.string().nonempty("Building name is required"),
  type: z.string().nonempty("Please select a building type"),
  subType: z.string().nonempty("Please select a sub-building type"),
  street: z.string().nonempty("Street number is required"),
  city: z.string().nonempty("City is required"),
  country: z.string().nonempty("Please select a country"),
  postalCode: z.string().nonempty("Postal code is required"),
  occupants: z
    .string()
    .nonempty("Number of occupants is required")
    .regex(/^\d+$/, "Must be a number"),
  roofLength: z.string().nonempty("Roof length is required"),
  roofWidth: z.string().nonempty("Roof width is required"),
  indoorTemp: z.string().nonempty("Indoor temperature is required"),
  roofType: z.string().nonempty("Roof type is required"),
  streetAddress: z.string().nonempty("Street address is required"),
  commodities: z.array(commoditySchema).min(1, "Add at least one commodity"),
});

type FormData = z.infer<typeof formSchema>;

const emptyCommodity = {
  state: "",
  commodity: "",
  accountNumber: "",
  accountName: "",
  units: "",
  accept: "",
  commCountry: "",
  utility: "",
  phone: "",
};

const CreateBuilding = () => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      subType: "",
      street: "",
      city: "",
      country: "",
      postalCode: "",
      occupants: "",
      roofLength: "",
      roofWidth: "",
      indoorTemp: "",
      roofType: "",
      streetAddress: "",
      commodities: [emptyCommodity],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "commodities",
  });

  const onSubmit = (data: FormData) => {
    console.log("Create building →", data);
    // TODO: dispatch / API call
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between ">
        <SectionHeader title="Building information" />
        <CommonButton variant="destructive" to="/basic-consumer/building">
          Cancel
        </CommonButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            placeholder="Building Name"
            className={inputClass.input}
            {...register("name")}
          />
          {errors.name && (
            <p className={inputClass.error}>{errors.name.message}</p>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <CommonSelect
                value={field.value}
                onValueChange={field.onChange}
                item={BUILDING_TYPES}
                placeholder="Select Building Type"
                className="w-full"
              />
            )}
          />
          {errors.type && (
            <p className={inputClass.error}>{errors.type.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Street Number"
            className={inputClass.input}
            {...register("street")}
          />
          {errors.street && (
            <p className={inputClass.error}>{errors.street.message}</p>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="subType"
            render={({ field }) => (
              <CommonSelect
                value={field.value}
                onValueChange={field.onChange}
                item={SUB_BUILDING_TYPES}
                placeholder="Select Sub-Building"
                className="w-full"
              />
            )}
          />
          {errors.subType && (
            <p className={inputClass.error}>{errors.subType.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="City"
            className={inputClass.input}
            {...register("city")}
          />
          {errors.city && (
            <p className={inputClass.error}>{errors.city.message}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Number of Occupants"
            className={inputClass.input}
            {...register("occupants")}
          />
          {errors.occupants && (
            <p className={inputClass.error}>{errors.occupants.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Roof Length"
            className={inputClass.input}
            {...register("roofLength")}
          />
          {errors.roofLength && (
            <p className={inputClass.error}>{errors.roofLength.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Roof Width"
            className={inputClass.input}
            {...register("roofWidth")}
          />
          {errors.roofWidth && (
            <p className={inputClass.error}>{errors.roofWidth.message}</p>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <CommonSelect
                value={field.value}
                onValueChange={field.onChange}
                item={COUNTRIES}
                placeholder="Select Country"
                className="w-full"
              />
            )}
          />
          {errors.country && (
            <p className={inputClass.error}>{errors.country.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Street Address"
            className={inputClass.input}
            {...register("streetAddress")}
          />
          {errors.streetAddress && (
            <p className={inputClass.error}>{errors.streetAddress.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Postal Code"
            className={inputClass.input}
            {...register("postalCode")}
          />
          {errors.postalCode && (
            <p className={inputClass.error}>{errors.postalCode.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Indoor Temperature"
            className={inputClass.input}
            {...register("indoorTemp")}
          />
          {errors.indoorTemp && (
            <p className={inputClass.error}>{errors.indoorTemp.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Roof Type"
            className={inputClass.input}
            {...register("roofType")}
          />
          {errors.roofType && (
            <p className={inputClass.error}>{errors.roofType.message}</p>
          )}
        </div>
      </div>

      <SectionHeader title="Commodities" />

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2">
          <div className="bg-primary-green text-white w-6 h-6 rounded-full flex justify-center items-center">
            {index + 1}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Controller
                control={control}
                name={`commodities.${index}.state`}
                render={({ field }) => (
                  <CommonSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    item={STATES}
                    placeholder="Select State"
                    className="w-full"
                  />
                )}
              />
              {errors.commodities?.[index]?.state && (
                <p className={inputClass.error}>
                  {errors.commodities[index]?.state?.message}
                </p>
              )}
            </div>

            <div>
              <Controller
                control={control}
                name={`commodities.${index}.commodity`}
                render={({ field }) => (
                  <CommonSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    item={COMMODITIES}
                    placeholder="Select Commodity"
                    className="w-full"
                  />
                )}
              />
              {errors.commodities?.[index]?.commodity && (
                <p className={inputClass.error}>
                  {errors.commodities[index]?.commodity?.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Account Number"
                className={inputClass.input}
                {...register(`commodities.${index}.accountNumber`)}
              />
              {errors.commodities?.[index]?.accountNumber && (
                <p className={inputClass.error}>
                  {errors.commodities[index]?.accountNumber?.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Account Name"
                className={inputClass.input}
                {...register(`commodities.${index}.accountName`)}
              />
              {errors.commodities?.[index]?.accountName && (
                <p className={inputClass.error}>
                  {errors.commodities[index]?.accountName?.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Units"
                className={inputClass.input}
                {...register(`commodities.${index}.units`)}
              />
              {errors.commodities?.[index]?.units && (
                <p className={inputClass.error}>
                  {errors.commodities[index]?.units?.message}
                </p>
              )}
            </div>

            <div>
              <Controller
                control={control}
                name={`commodities.${index}.accept`}
                render={({ field }) => (
                  <CommonSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    item={ACCEPT_OPTIONS}
                    placeholder="Accept"
                    className="w-full"
                  />
                )}
              />
              {errors.commodities?.[index]?.accept && (
                <p className={inputClass.error}>
                  {errors.commodities[index]?.accept?.message}
                </p>
              )}
            </div>

            <div>
              <Controller
                control={control}
                name={`commodities.${index}.commCountry`}
                render={({ field }) => (
                  <CommonSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    item={COUNTRIES}
                    placeholder="Select Country"
                    className="w-full"
                  />
                )}
              />
              {errors.commodities?.[index]?.commCountry && (
                <p className={inputClass.error}>
                  {errors.commodities[index]?.commCountry?.message}
                </p>
              )}
            </div>

            <div>
              <Controller
                control={control}
                name={`commodities.${index}.utility`}
                render={({ field }) => (
                  <CommonSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    item={UTILITY_COMPANIES}
                    placeholder="Utility Company"
                    className="w-full"
                  />
                )}
              />
              {errors.commodities?.[index]?.utility && (
                <p className={inputClass.error}>
                  {errors.commodities[index]?.utility?.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className={inputClass.input}
                {...register(`commodities.${index}.phone`)}
              />
              {errors.commodities?.[index]?.phone && (
                <p className={inputClass.error}>
                  {errors.commodities[index]?.phone?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-2 pt-1">
        <CommonButton
          type="button"
          variant="secondary"
          onClick={() => append(emptyCommodity)}
        >
          Add Commodity
        </CommonButton>
        <CommonButton
          type="button"
          variant="destructive"
          onClick={() => fields.length > 1 && remove(fields.length - 1)}
        >
          Remove Commodity
        </CommonButton>
        <CommonButton type="submit">Create Building</CommonButton>
      </div>
    </form>
  );
};

export default CreateBuilding;
