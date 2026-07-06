import { useForgotPasswordMutation } from "@/store/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CommonButton from "../button/CommonButton";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await forgotPassword(data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const inputClass = {
    input: "w-full border border-primary-gray p-2 outline-none ",
    label: "text-primary-gray block mb-1",
    error: "text-red-500 text-sm mt-1",
  };

  return (
    <div className=" h-[calc(100vh-74px)] flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>

        <div className="">
          <label className={inputClass.label}>Email</label>
          <input
            type="email"
            {...register("email")}
            className={`${inputClass.input} transition ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className={inputClass.error}>{errors.email.message}</p>
          )}
        </div>

        <CommonButton type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Sending..." : "Send Email"}
        </CommonButton>
      </form>
    </div>
  );
};

export default ForgotPassword;
