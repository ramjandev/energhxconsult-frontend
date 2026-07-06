import CommonButton from "@/common/button/CommonButton";
import { useCreatePasswordMutation } from "@/store/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

const CreatePassword = () => {
  const [createPassword, { isLoading }] = useCreatePasswordMutation();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [emailFetched, setEmailFetched] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (token) {
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        if (decoded.email) {
          setEmailFetched(decoded.email);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (emailFetched) {
      reset({ email: emailFetched, password: "" });
    }
  }, [emailFetched, reset]);

  const onSubmit = async (data: FormData) => {
    if (token) {
      await createPassword({ login: data, token });
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-76px)] bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Create Password</h2>

        <div>
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-gray-300 rounded-md p-2"
            disabled={!!emailFetched}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-700">New Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <CommonButton type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Submitting..." : "Create Password"}
        </CommonButton>
      </form>
    </div>
  );
};

export default CreatePassword;
