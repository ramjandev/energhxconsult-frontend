import CommonButton from "@/common/button/CommonButton";
import CommonWrapper from "@/common/CommonWrapper";
import CommonPersonalInfo from "@/common/form/CommonPersonalInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { basicConsumer, TbasicConsumer } from "./ValidationSchema";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TbasicConsumer>({
    resolver: zodResolver(basicConsumer),
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <CommonWrapper>
      <form className="flex flex-col gap-8 px-4">
        {/* <DashBoardHeader>Personal Information</DashBoardHeader> */}

        <CommonPersonalInfo
          register={register}
          errors={errors}
          control={control}
          watch={watch}
        />
        <CommonButton type="submit" disabled={isLoading} className=" w-fit">
          {isLoading ? "Processing..." : "Sign Up"}
        </CommonButton>
      </form>
    </CommonWrapper>
  );
};

export default SignUp;
