import { NextPage } from "next";
import React from "react";
import querystring from "querystring";
import Button from "@/components/Button/Button";

type SuccessProps = {
  searchParams: {
    day: string;
    time: string;
    service: string;
  };
};

const Success: NextPage<SuccessProps> = ({ searchParams }) => {
  return (
    <main className="flex min-h-screen justify-center p-10">
      <div className="w-full max-w-lg flex items-center flex-col">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 256 256"
          className="fill-green-600"
        >
          <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
        </svg>
        <span className="text-green-600 font-semibold mt-2">
          Booking Confirmed!
        </span>
        <span className="mt-1 font-bold">
          {searchParams.service} {searchParams.day} {searchParams.time}
        </span>
        <a href="/" className="mt-3 w-full">
          <Button isLoading={false} type="button">
            Go Back
          </Button>
        </a>
      </div>
    </main>
  );
};

export default Success;
