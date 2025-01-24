import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const StepTwo = ({ setCurrentStep, onChangeHandler, form }) => {
  return (
    <>
      <div id="container">
        <div className="pb-[50px]">
          <Button onClick={() => setCurrentStep(1)} className="bg-transparent border-solid border-[1px] ">
            <ArrowLeft className="text-[#18181B]" />
          </Button>
        </div>
        <form>
          <label className="text-[1.5rem] text-[#09090B] ">
            Create a strong password
            <br />
            <p className="text-[1rem] text-[#71717A]">Create a strong password with letters, numbers.</p>
            <br />
          </label>

          <div className="pt-[-70px]">
            <Input onChange={onChangeHandler} className="pr-[250px]" id="password" type="text" placeholder="password" />
          </div>

          <div className="pt-[20px]">
            <Input onChange={onChangeHandler} className="pr-[250px]" id="confirm" type="text" placeholder="confirm password" />
          </div>
        </form>

        <div className="pt-[25px]">
          <Button disabled={!form.password || !form.confirm} className="w-full">
            Let's Go
          </Button>
        </div>

        <div className="py-5 text-[#71717A] text-center">
          Already have an account?
          <Link className="text-[#2563EB]" href={""}>
            Log in
          </Link>
        </div>
      </div>
    </>
  );
};
