"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput/TextInput";
import GoogleIcon from "@/icons/GoogleIcon/GoogleIcon";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

type FormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

const SignUp: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
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

      await response.json();

      toast.success("Successfully registered!");
    } catch (error) {
      toast.error(`An error occured`);
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-10">
      <div className="w-full max-w-lg">
        <h2 className="mb-5 text-3xl text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Name"
            id="name"
            error={errors.name?.message}
            register={register}
          />

          <TextInput
            label="Surname"
            id="surname"
            error={errors.surname?.message}
            register={register}
          />

          <TextInput
            label="Email"
            id="email"
            error={errors.email?.message}
            register={register}
            type="email"
          />

          <TextInput
            label="Password"
            id="password"
            error={errors.password?.message}
            register={register}
            type="password"
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
            Sign Up
          </Button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-700">
            Sign In
          </Link>
        </p>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
        }}
      />
    </main>
  );
};

export default SignUp;
