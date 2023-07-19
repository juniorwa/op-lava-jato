"use client";
import { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";

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

      const responseData = await response.json();

      alert(JSON.stringify(responseData));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-10 pt-0">
      <div className="w-full max-w-md bg-gray-900 p-10 rounded-lg">
        <h2 className="mb-8 text-3xl text-center">Register User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required." })}
              className="w-full p-2 border rounded-lg bg-gray-900"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="surname" className="block mb-2">
              Surname
            </label>
            <input
              type="text"
              id="surname"
              {...register("surname", { required: "Surname is required." })}
              className="w-full p-2 border rounded-lg bg-gray-900"
            />
            {errors.surname && (
              <p className="text-red-500">{errors.surname.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required." })}
              className="w-full p-2 border rounded-lg bg-gray-900"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required." })}
              className="w-full p-2 border rounded-lg bg-gray-900"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-lg relative"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 absolute top-1/2 left-1/2 -mt-2 -ml-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 2.647A7.962 7.962 0 0120 12h4v.009A11.964 11.964 0 0020 12zm-10 7.938A7.962 7.962 0 018 12H4v-.009A11.964 11.964 0 0010 12c0 3.042-1.135 5.824-3 7.938l3 2.647z"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
