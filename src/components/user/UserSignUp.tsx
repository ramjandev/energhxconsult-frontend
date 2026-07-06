import CommonButton from "@/common/button/CommonButton";
import CommonWrapper from "@/common/CommonWrapper";
import { useUserRegisterMutation } from "@/store/auth/authApi";
import {
  useGetAllCountriesQuery,
  useLazyGetAllStatesQuery,
} from "@/store/LMS/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SignUpType, signupSchema } from "./ValidationSchema";

interface Props {
  title: string;
}
const UserSignUp: React.FC<Props> = ({ title }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [userRegister, { isLoading }] = useUserRegisterMutation();

  const [getAllStates, { data: states }] = useLazyGetAllStatesQuery();
  const allStates = states?.data;

  const userType = "SERVER";
  const { data } = useGetAllCountriesQuery();
  const allCountries = data?.data;

  const {
    register,
    handleSubmit,
    setValue,
    watch,

    control,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signupSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };

  const onSubmit = async (data: SignUpType) => {
    const newUser = { ...data, userType: userType };

    try {
      const formData = new FormData();
      const { image, ...restData } = newUser;

      formData.append("text", JSON.stringify(restData));

      if (image && image instanceof File) {
        formData.append("file", image);
      }
      if (title === "Update Profile") {
        // await updateUser(formData);
      } else {
        await userRegister(formData);
      }
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
    }
  };

  const selectedCountry = allCountries?.find(
    (c) => c.id === watch("countryId"),
  )?.name;

  return (
    <CommonWrapper>
      <div>
        <p className="my-5 text-primary-gray text-md font-semibold">
          Personal Information
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="firstName" className="text-primary-gray text-md">
                First Name
              </label>
              <input
                {...register("firstName")}
                id="firstName"
                placeholder="First Name"
                className="mt-1 w-full p-2 border border-primary-gray"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="text-primary-gray text-md">
                Last Name
              </label>
              <input
                {...register("lastName")}
                id="lastName"
                placeholder="Last Name"
                className="mt-1 w-full p-2 border border-primary-gray"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="otherName" className="text-primary-gray text-md">
                Other Name
              </label>
              <input
                {...register("otherName")}
                id="otherName"
                placeholder="Other Name"
                className="mt-1 w-full p-2 border border-primary-gray"
              />
              {errors.otherName && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.otherName.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-primary-gray text-md">Company Name</label>
              <input
                type="text"
                {...register("companyName")}
                className="mt-1 w-full p-2 border border-primary-gray"
                placeholder="Company Name"
              />
            </div>
          </div>

          {/* Second Part */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 items-center">
            {/* Gender */}
            <div>
              <label className="text-primary-gray">Sex</label>
              <div className="flex gap-4 ">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="MALE"
                    className="hidden peer"
                    {...register("sex")}
                  />
                  <span className="min-w-5 min-h-5 inline-block border rounded-sm border-primary-gray bg-white peer-checked:bg-primary-green"></span>
                  <span className="text-primary-gray ml-1">Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="FEMALE"
                    className="hidden peer"
                    {...register("sex")}
                  />
                  <span className="min-w-5 min-h-5 inline-block border rounded-sm border-primary-gray bg-white peer-checked:bg-primary-green"></span>
                  <span className="text-primary-gray ml-1">Female</span>
                </label>
              </div>
              {errors.sex && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.sex.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-primary-gray text-md">
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                className="mt-1 w-full p-2 border border-primary-gray"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="photo"
                className="block text-primary-gray text-md mb-1"
              >
                Photo
              </label>
              <div className="flex items-center border border-primary bg-secondary p-2 relative">
                <span className="text-xl text-primary">
                  <AiOutlineUpload />
                </span>
                <p className="px-2 text-primary">Upload photo</p>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              {errors.image && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Image Preview */}
            <div>
              {imagePreview && (
                <div className="mt-2">
                  <p className="text-sm text-primary-gray mb-1">
                    Image Preview:
                  </p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-xs max-h-48 object-contain border border-primary-gray rounded-md"
                  />
                </div>
              )}
              {imagePreview && (
                <button
                  type="button"
                  onClick={() => {
                    setValue("image", undefined, { shouldValidate: true });
                    setImagePreview(null);
                    const input = document.getElementById(
                      "photo",
                    ) as HTMLInputElement;
                    if (input) input.value = "";
                  }}
                  className="mt-2 text-sm bg-red-500 px-4 py-2 rounded-md text-white"
                >
                  Remove Image
                </button>
              )}
            </div>

            {/* Street Address Label */}
            <p className="col-span-1 md:col-span-2 lg:col-span-3 text-primary-gray font-semibold">
              Street Address
            </p>

            <div>
              <label
                htmlFor="streetNumber"
                className="text-primary-gray text-md"
              >
                Street number
              </label>
              <input
                type="text"
                {...register("streetNumber")}
                id="streetNumber"
                className="mt-1 w-full p-2 border border-primary-gray"
                placeholder="Enter Number"
              />
              {errors.streetNumber && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.streetNumber.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="street" className="text-primary-gray text-md">
                Street
              </label>
              <input
                {...register("street")}
                id="street"
                className="mt-1 w-full p-2 border border-primary-gray"
                placeholder="Street Address"
              />
              {errors.street && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.street.message}
                </p>
              )}
            </div>

            {/* Country Select */}
            <div>
              <label
                htmlFor="countryId"
                className="text-primary-gray block mb-1"
              >
                Country
              </label>
              <Controller
                name="countryId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      getAllStates(value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full outline-none text-primary-gray py-5 rounded-none">
                      <SelectValue placeholder="Choose country" />
                    </SelectTrigger>
                    <SelectContent className="bg-light-green">
                      {allCountries?.map((country) => (
                        <SelectItem
                          key={country.id}
                          value={country.id}
                          className="hover:bg-primary-green hover:text-white"
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.countryId && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.countryId.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="stateId" className="text-primary-gray block mb-1">
                Province
              </label>
              <Controller
                name="stateId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full outline-none text-primary-gray py-5 rounded-none">
                      <SelectValue placeholder="Choose province" />
                    </SelectTrigger>
                    <SelectContent className="bg-light-green">
                      {allStates?.map((state) => (
                        <SelectItem
                          key={state.id}
                          value={state.id}
                          className="hover:bg-primary-green hover:text-white"
                        >
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.stateId && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.stateId.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="text-primary-gray text-md">
                City
              </label>
              <input
                {...register("city")}
                id="city"
                className="mt-1 w-full p-2 border border-primary-gray"
                placeholder="City"
              />
              {errors.city && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="postalCode" className="text-primary-gray text-md">
                Postal Code
              </label>
              <input
                {...register("postalCode")}
                type={selectedCountry === "Canada" ? "text" : "number"}
                {...register("postalCode", {
                  valueAsNumber: selectedCountry !== "Canada",
                })}
                id="postalCode"
                className="mt-1 w-full p-2 border border-primary-gray"
                placeholder="Postal Code"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="py-10">
            <CommonButton type="submit" disabled={isLoading}>
              {isLoading ? "Processing" : title}
            </CommonButton>
          </div>
        </form>
      </div>
    </CommonWrapper>
  );
};

export default UserSignUp;
