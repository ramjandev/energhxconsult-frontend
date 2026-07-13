import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/button/CommonSelect";
import SectionHeader from "@/common/header/SectionHeader";
import { inputClass } from "@/pages/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import ProfilePhotoUpload from "./ProfilePhotoUpload";

const COUNTRIES = [
  { label: "Nigeria", value: "NG" },
  { label: "USA", value: "US" },
  { label: "UK", value: "GB" },
  { label: "Canada", value: "CA" },
  { label: "Germany", value: "DE" },
];

const PROVINCES = [
  { label: "Lagos", value: "lagos" },
  { label: "Abuja", value: "abuja" },
  { label: "Rivers", value: "rivers" },
];

const formSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  otherName: z.string().optional(),
  companyName: z.string().optional(),
  sex: z.enum(["male", "female"], {
    required_error: "Please select a sex",
  }),
  email: z.string().nonempty("Email is required").email("Enter a valid email"),
  streetNumber: z.string().nonempty("Street number is required"),
  street: z.string().nonempty("Street is required"),
  country: z.string().nonempty("Please select a country"),
  province: z.string().nonempty("Please select a province"),
  city: z.string().nonempty("City is required"),
  postalCode: z.string().nonempty("Postal code is required"),
});

type FormData = z.infer<typeof formSchema>;

const ProfileForm = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      otherName: "",
      companyName: "",
      sex: "male",
      email: "",
      streetNumber: "",
      street: "",
      country: "",
      province: "",
      city: "",
      postalCode: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Update profile →", data);
    // TODO: dispatch / API call
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader
        size="xl"
        title="Update Profile"
        description="Update your profile information"
      />
      <ProfilePhotoUpload onAvatarChange={(file) => console.log(file)} />

      <div>
        <SectionHeader size="md" title="Personal Information" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 mt-2">
          <div>
            <label className={inputClass.label}>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className={inputClass.input}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className={inputClass.error}>{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className={inputClass.input}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className={inputClass.error}>{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Other Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className={inputClass.input}
              {...register("otherName")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <label className={inputClass.label}>Company Name</label>
            <input
              type="text"
              placeholder="Company name"
              className={inputClass.input}
              {...register("companyName")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <label className={inputClass.label}>Sex</label>
            <div className="flex items-center gap-6 h-[42px]">
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input
                  type="radio"
                  value="male"
                  {...register("sex")}
                  className="w-4 h-4 accent-green-600"
                />
                Male
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input
                  type="radio"
                  value="female"
                  {...register("sex")}
                  className="w-4 h-4 accent-green-600"
                />
                Female
              </label>
            </div>
            {errors.sex && (
              <p className={inputClass.error}>{errors.sex.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Mail</label>
            <input
              type="email"
              placeholder="Enter Email"
              className={inputClass.input}
              {...register("email")}
            />
            {errors.email && (
              <p className={inputClass.error}>{errors.email.message}</p>
            )}
          </div>
        </div>

        <h3 className="text-sm font-bold text-foreground mb-4">
          Street Address
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <label className={inputClass.label}>Street number</label>
            <input
              type="text"
              placeholder="Enter Number"
              className={inputClass.input}
              {...register("streetNumber")}
            />
            {errors.streetNumber && (
              <p className={inputClass.error}>{errors.streetNumber.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Street</label>
            <input
              type="text"
              placeholder="Enter Street"
              className={inputClass.input}
              {...register("street")}
            />
            {errors.street && (
              <p className={inputClass.error}>{errors.street.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Country</label>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  item={COUNTRIES}
                  placeholder="Choose country"
                  className="w-full"
                />
              )}
            />
            {errors.country && (
              <p className={inputClass.error}>{errors.country.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className={inputClass.label}>Province</label>
            <Controller
              control={control}
              name="province"
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  item={PROVINCES}
                  placeholder="Choose country"
                  className="w-full"
                />
              )}
            />
            {errors.province && (
              <p className={inputClass.error}>{errors.province.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>City</label>
            <input
              type="text"
              placeholder="Enter City"
              className={inputClass.input}
              {...register("city")}
            />
            {errors.city && (
              <p className={inputClass.error}>{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Postal Code</label>
            <input
              type="text"
              placeholder="Enter Postal Code"
              className={inputClass.input}
              {...register("postalCode")}
            />
            {errors.postalCode && (
              <p className={inputClass.error}>{errors.postalCode.message}</p>
            )}
          </div>
        </div>
      </div>

      <CommonButton type="submit">Update Profile</CommonButton>
    </form>
  );
};

export default ProfileForm;
