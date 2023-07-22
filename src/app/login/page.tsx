"use client";
import React, { useEffect } from "react";
import Button from "@/components/Button/Button";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput/TextInput";
import GoogleIcon from "@/icons/GoogleIcon/GoogleIcon";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage/useLocalStorage";

type FormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    name: string;
    email: string;
    surname: string;
  };
};

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const error = searchParams?.get("error");

  useEffect(() => {
    if (error) {
      toast("You need to login in order to book!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
        },
      });
    }
  }, []);

  const [, setToken] = useLocalStorage<string>("", "token");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseData: LoginResponse = await response.json();

      setToken(responseData.token);

      toast.success(`Welcome ${responseData.user.name}`);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      toast.error(`An error occured`);
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

export default SignIn;
