"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput/TextInput";
import GoogleIcon from "@/icons/GoogleIcon/GoogleIcon";
import Link from "next/link";

type FormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    alert(JSON.stringify(data));

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseData = await response.json();

      console.log({ successData: responseData });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-10">
      <div className="w-full max-w-lg">
        <h2 className="mb-5 text-3xl text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            id="email"
            error={errors.email?.message}
            register={register}
          />

          <TextInput
            label="Password"
            id="password"
            error={errors.password?.message}
            register={register}
          />
          <Button
            isLoading={false}
            type="button"
            className="mt-3"
            variant="white"
          >
            <div className="flex items-center justify-center">
              <GoogleIcon />
              <span className="ml-2 text-black">Continue with Google</span>
            </div>
          </Button>
          <Button isLoading={isSubmitting} type="submit" className="mt-3">
            Sign In
          </Button>
        </form>

        <p className="mt-4 text-center">
          {"Don't have an account?"}{" "}
          <Link href="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignIn;
