"use client";

import React, { useState } from "react";
import {
  Form,
  Button,
  TextField,
  Label,
  InputGroup,
  FieldError,
  Link,
  Separator,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Envelope, ArrowRight, Eye, EyeSlash, Person } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { LuLockKeyhole, LuBriefcase, LuUser } from "react-icons/lu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [step, setStep] = useState<"form" | "role">("form");
  const [passwordValue, setPasswordValue] = useState("");
  const router = useRouter();

  const [registrationData, setRegistrationData] = useState<
    Record<string, string>
  >({});

  const onRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    setRegistrationData(data);
    toast("Select your Role for complete your registration")
    setStep("role"); 
  };

 const handleRoleSelection = async (role: "client" | "lawyer") => {
   setIsLoading(true);
   try {
     const { data, error } = await authClient.signUp.email({
       email: registrationData.email,
       password: registrationData.password,
       name: registrationData.name,
       role: role,
     } as any);

     if (error) {
       toast.error(error.message || "An authentication runtime variance occurred.");
       return;
     }

     router.refresh();

     if (role === "lawyer") {
       router.push("/dashboard/lawyer");
      //  window.location.reload()
     } else {
       router.push("/");
      //  window.location.reload()
     }
   } catch (err) {
     console.error("Registration runtime crash:", err);
   } finally {
     toast.success("Registration successfull!")
     setIsLoading(false);
   }
 };

  const handleGoogleSignUp = async () => {
    console.log("google button clicked")
    // try {
    //   await authClient.signIn.social({
    //     provider: "google",
    //     callbackURL: "/dashboard",
    //   });
    // } catch (err) {
    //   console.error("OAuth loop sequence failure:", err);
    // }
  };

  return (
    <main className="min-h-[90vh] w-full flex items-center justify-center bg-background text-foreground px-4 transition-colors duration-200">
      <div className="w-full max-w-md relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === "form" ? (
            /* STEP 1: Core Registration Input Fields */
            <motion.div
              key="register-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1.0] }}
              className="bg-content1 border border-default-100 dark:border-default-50/50 rounded-3xl overflow-hidden p-8 dark:shadow-none transition-all duration-300"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                  Create an account
                </h1>
                <p className="text-sm text-default-400 dark:text-gray-500 mt-2">
                  Get started with your credentials
                </p>
              </div>

              <Form className="flex flex-col gap-5" onSubmit={onRegisterSubmit}>
                {/* Full Name Input Field */}
                <TextField
                  isRequired
                  name="name"
                  type="text"
                  className="w-full"
                >
                  <Label className="text-sm font-medium mb-1.5 block text-default-700 dark:text-default-300">
                    Full Name
                  </Label>
                  <InputGroup className="transition-all duration-200">
                    <InputGroup.Prefix className="pl-3 flex items-center justify-center">
                      <Person className="size-4 text-default-400" />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      placeholder="John Doe"
                      className="bg-transparent"
                    />
                  </InputGroup>
                  <FieldError className="text-xs text-danger mt-1" />
                </TextField>

                {/* Email Input Field */}
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  className="w-full"
                  validate={(value) => {
                    if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ) {
                      return "Please enter a valid email address";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium mb-1.5 block text-default-700 dark:text-default-300">
                    Email Address
                  </Label>
                  <InputGroup className="transition-all duration-200">
                    <InputGroup.Prefix className="pl-3 flex items-center justify-center">
                      <Envelope className="size-4 text-default-400" />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      placeholder="you@example.com"
                      className="bg-transparent"
                    />
                  </InputGroup>
                  <FieldError className="text-xs text-danger mt-1" />
                </TextField>

                {/* Password Input Field */}
                <TextField
                  isRequired
                  name="password"
                  className="w-full"
                  onChange={(value) => setPasswordValue(value)}
                  validate={(value) => {
                    if (!/\S/.test(value)) {
                      return "Password cannot be empty spaces";
                    }
                    if (value.length < 8) {
                      return "Password must be at least 8 characters";
                    }
                    if (!/[A-Z]/.test(value)) {
                      return "Password must contain at least one uppercase letter";
                    }
                    if (!/[a-z]/.test(value)) {
                      return "Password must contain at least one lowercase letter";
                    }
                    if (!/[0-9]/.test(value)) {
                      return "Password must contain at least one number";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium mb-1.5 block text-default-700 dark:text-default-300">
                    Password
                  </Label>
                  <InputGroup className="transition-all duration-200">
                    <InputGroup.Prefix className="pl-3 flex items-center justify-center">
                      <LuLockKeyhole className="size-4 text-default-400" />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      placeholder="••••••••"
                      type={isVisible ? "text" : "password"}
                      className="bg-transparent"
                    />
                    <InputGroup.Suffix className="pr-1 flex items-center justify-center">
                      <Button
                        isIconOnly
                        aria-label={
                          isVisible ? "Hide password" : "Show password"
                        }
                        variant="ghost"
                        className="w-8 h-8 min-w-8 text-default-400 hover:text-default-600 border-none bg-transparent hover:bg-default-100 rounded-lg"
                        onPress={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? (
                          <Eye className="size-4" />
                        ) : (
                          <EyeSlash className="size-4" />
                        )}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>
                  <FieldError className="text-xs text-danger mt-1" />
                </TextField>

                {/* Confirm Password Input Field */}
                <TextField
                  isRequired
                  name="confirmPassword"
                  className="w-full"
                  validate={(value) => {
                    if (value !== passwordValue) {
                      return "Passwords do not match";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium mb-1.5 block text-default-700 dark:text-default-300">
                    Confirm Password
                  </Label>
                  <InputGroup className="transition-all duration-200">
                    <InputGroup.Prefix className="pl-3 flex items-center justify-center">
                      <LuLockKeyhole className="size-4 text-default-400" />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      placeholder="••••••••"
                      type={isConfirmVisible ? "text" : "password"}
                      className="bg-transparent"
                    />
                    <InputGroup.Suffix className="pr-1 flex items-center justify-center">
                      <Button
                        isIconOnly
                        aria-label={
                          isConfirmVisible ? "Hide password" : "Show password"
                        }
                        variant="ghost"
                        className="w-8 h-8 min-w-8 text-default-400 hover:text-default-600 border-none bg-transparent hover:bg-default-100 rounded-lg"
                        onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                      >
                        {isConfirmVisible ? (
                          <Eye className="size-4" />
                        ) : (
                          <EyeSlash className="size-4" />
                        )}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>
                  <FieldError className="text-xs text-danger mt-1" />
                </TextField>

                <Button
                  type="submit"
                  className="w-full h-12 font-semibold rounded-xl mt-2 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Form>

              <div className="text-center mt-6 space-y-5">
                <p className="text-sm text-default-500">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign in
                  </Link>
                </p>

                <div className="flex items-center w-full py-2">
                  <Separator orientation="horizontal" className="flex-1" />
                  <span className="px-3 text-xs uppercase tracking-wider text-default-400 select-none">
                    or
                  </span>
                  <Separator orientation="horizontal" className="flex-1" />
                </div>

                <Button
                  variant="outline"
                  onClick={handleGoogleSignUp}
                  className="w-full h-12 rounded-xl border-default-200 dark:border-default-100 font-medium hover:bg-default-50/50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <FcGoogle className="size-5" />
                  Continue with Google
                </Button>
              </div>
            </motion.div>
          ) : (
            /* STEP 2: Post-Registration Role Selection (User vs Lawyer) */
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1.0] }}
              className="bg-content1 border border-default-100 dark:border-default-50/50 rounded-3xl p-8 dark:shadow-none transition-all duration-300"
            >
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold tracking-tight">
                  Choose your account type
                </h1>
                <p className="text-sm text-default-400 dark:text-gray-500 mt-2">
                  Select the role that fits your goals on the portal
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleRoleSelection("client")}
                  className="w-full p-5 text-left border border-default-200 rounded-2xl bg-transparent hover:bg-default-50 hover:border-primary group transition-all duration-200 flex items-start gap-4 active:scale-[0.99] disabled:opacity-50"
                >
                  <div className="p-3 bg-default-100 dark:bg-default-50 rounded-xl text-default-600 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                    {isLoading ? (
                      <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                    ) : (
                      <LuUser className="size-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                      I am a Client / User
                    </h3>
                    <p className="text-xs text-default-400 mt-1 leading-relaxed">
                      I want to browse legal categories, match with
                      professionals, and find legal representation.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleRoleSelection("lawyer")}
                  className="w-full p-5 text-left border border-default-200 rounded-2xl bg-transparent hover:bg-default-50 hover:border-primary group transition-all duration-200 flex items-start gap-4 active:scale-[0.99] disabled:opacity-50"
                >
                  <div className="p-3 bg-default-100 dark:bg-default-50 rounded-xl text-default-600 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                    {isLoading ? (
                      <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                    ) : (
                      <LuBriefcase className="size-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                      I am a Practitioner / Lawyer
                    </h3>
                    <p className="text-xs text-default-400 mt-1 leading-relaxed">
                      I want to claim my practice profile, review case
                      assignments, and handle active consumer clients.
                    </p>
                  </div>
                </button>
              </div>

              <div className="text-center mt-6">
                <Button
                  variant="ghost"
                  isDisabled={isLoading}
                  className="text-xs font-medium text-default-400 hover:text-default-600 border-none bg-transparent"
                  onPress={() => setStep("form")}
                >
                  Change registration info
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
