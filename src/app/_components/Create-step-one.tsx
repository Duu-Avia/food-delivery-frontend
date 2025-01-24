import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const StepOne = ({ setCurrentStep, onChangeHandler, form }) => {
  return (
    <>
      <div id="container">
        <div className="pb-[50px]">
          <Link href="/">
            <Button className="bg-transparent border-solid border-[1px] ">
              <ArrowLeft className="text-[#18181B]" />
            </Button>
          </Link>
        </div>

        <form>
          <label className="text-[1.5rem] text-[#09090B] ">
            Create your account
            <br />
            <p className="text-[1rem] text-[#71717A]">Sign up to explore your favorite dishes.</p>
            <br />
          </label>
          <div className="pt-[-70px]">
            <Input onChange={onChangeHandler} className="pr-[250px]" id="email" type="text" placeholder="Email" />
          </div>
        </form>

        <div className="pt-[25px]">
          <Button disabled={!form.email} onClick={() => setCurrentStep(2)} className="w-full">
            Let's Go
          </Button>
        </div>

        <div className="py-5 text-[#71717A] text-center">
          Already have an account?{" "}
          <Link className="text-[#2563EB]" href={""}>
            Log in
          </Link>
        </div>
      </div>
    </>
  );
};
