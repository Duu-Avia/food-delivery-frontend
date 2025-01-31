"use client";
import { useState } from "react";
import { StepOne } from "../_components/Create-step-one";
import { StepTwo } from "../_components/Create-step-two";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const MainBody = ({ currentStep, setCurrentStep, onChangeHandler, form }) => {
  if (currentStep === 1) {
    return <StepOne setCurrentStep={setCurrentStep} onChangeHandler={onChangeHandler} form={form} />;
  }
  if (currentStep === 2) {
    return <StepTwo setCurrentStep={setCurrentStep} onChangeHandler={onChangeHandler} form={form} />;
  }
};

export default function CreateAccountHome() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  const onChangeHandler = (e) => {
    const idTaker = e.target.id;
    const newValue = { ...form, [idTaker]: e.target.value };
    setForm(newValue);
  };
  return (
    <div className="flex justify-center items-center gap-10 pt-[20px]">
      <img src="./Frame1321316047.png" alt="" />
    </div>
  );
}
