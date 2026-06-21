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
import { Envelope,  ArrowRight, Eye, EyeSlash } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { LuLockKeyhole } from "react-icons/lu";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    console.log("Login execution payload:", data);

    setTimeout(() => setIsLoading(false), 1500);
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
                // Ensure it's not purely empty spaces
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
              className="w-full h-12 rounded-xl border-default-200 dark:border-default-100 font-medium hover:bg-default-50/50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              onClick={() => console.log("Google Auth requested")}
            >
              <FcGoogle />
              {/* <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg> */}
              Continue with Google
            </Button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
