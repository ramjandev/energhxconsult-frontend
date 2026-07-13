import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import { inputClass } from "@/pages/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "./PasswordInput";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty("New password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

const PasswordForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Update password →", data);
    // TODO: dispatch / API call
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-md">
      <SectionHeader
        size="xl"
        title="Change Password"
        description="Update your password"
      />
      <div>
        <label className={inputClass.label}>New Password</label>
        <PasswordInput placeholder="Type here" {...register("newPassword")} />
        {errors.newPassword && (
          <p className={inputClass.error}>{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label className={inputClass.label}>Confirm Password</label>
        <PasswordInput
          placeholder="Type here"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className={inputClass.error}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <CommonButton type="submit">Update Password</CommonButton>
    </form>
  );
};

export default PasswordForm;
