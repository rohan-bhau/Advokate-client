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
import { motion } from "framer-motion";
import { Envelope, ArrowRight, Eye, EyeSlash } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { LuLockKeyhole } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

 const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   setIsLoading(true);

   const formData = new FormData(e.currentTarget);
   const data: Record<string, string> = {};
   formData.forEach((value, key) => {
     data[key] = value.toString();
   });

   try {
     const { data: session, error } = await authClient.signIn.email({
       email: data.email,
       password: data.password,
     });

     if (error) {
       toast.error(
         error.message || "Invalid credentials or authentication variance.",
       );
       setIsLoading(false); 
       return;
     }

     console.log("Session verified successfully:", session);

     const userRole = (session?.user as any)?.role;
     const firstName = session?.user?.name?.split(" ")[0] || "User";

     toast.success(`Welcome back, ${firstName}`);

     if (userRole === "lawyer") {
       router.push("/dashboard/lawyer");
     } else {
       router.push("/");
     }
   } catch (err) {
     console.error("Login verification loop exception:", err);
     toast.error("An unexpected system exception occurred.");
   } finally {
     setIsLoading(false);
   }
 };

  const handleGoogleSignIn = async () => {
    console.log("google button clicked")
    // try {
    //   await authClient.signIn.social({
    //     provider: "google",
    //     callbackURL: "/dashboard", 
    //   });
    // } catch (err) {
    //   console.error("Google Auth execution failure:", err);
    // }
  };

  return (
    <main className="min-h-[90vh] w-full flex items-center justify-center bg-background text-foreground px-4 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] }}
        className="w-full max-w-md"
      >
        {/* Core Auth Card Panel Wrapper */}
        <div className="bg-content1 border border-default-100 dark:border-default-50/50 rounded-3xl p-8 shadow-xl dark:shadow-none transition-all duration-300">
          {/* Header Typography */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-sm text-default-400 dark:text-gray-500 mt-2">
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Core Login Form Element */}
          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {/* Email Input Field */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
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

            {/* Password Input Field with Visibility Toggle */}
            <TextField
              isRequired
              name="password"
              className="w-full"
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
              <div className="flex justify-between items-center mb-1.5">
                <Label className="text-sm font-medium text-default-700 dark:text-default-300">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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
                    aria-label={isVisible ? "Hide password" : "Show password"}
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

            {/* Main Email/Password Submission Button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="w-full h-12 font-semibold rounded-xl mt-2 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </Form>

          {/* Context Footer Switch Options */}
          <div className="text-center mt-6 space-y-5">
            <p className="text-sm text-default-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>

            {/* Separator Layout */}
            <div className="flex items-center w-full py-2">
              <Separator orientation="horizontal" className="flex-1" />
              <span className="px-3 text-xs uppercase tracking-wider text-default-400 select-none">
                or
              </span>
              <Separator orientation="horizontal" className="flex-1" />
            </div>

            {/* Google OAuth Button */}
            <Button
              variant="outline"
              isDisabled={isLoading}
              onClick={handleGoogleSignIn}
              className="w-full h-12 rounded-xl border-default-200 dark:border-default-100 font-medium hover:bg-default-50/50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <FcGoogle className="size-5" />
              Continue with Google
            </Button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
