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
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const responseData = await response.json();
  
      alert(JSON.stringify(responseData));
    } catch (error) {
      console.error('An error occurred:', error);
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
            className="w-full p-2 bg-blue-500 text-white rounded-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
