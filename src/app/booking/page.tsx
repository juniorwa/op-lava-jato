"use client";
import Button from "@/components/Button/Button";
import { NextPage } from "next";
import React, { useState } from "react";

const BookingPage: NextPage = () => {
  // Mock data for available time slots
  const availableTimeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
  ];

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(""); // State to track selected time slot

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10">
      <div className="w-full max-w-lg">
        <h2 className="mb-8 text-3xl text-center text-white">
          Book a Time Slot
        </h2>
        <div className="mb-4">
          <label className="block mb-2 text-white">Select Time Slot</label>
          <div className="flex flex-col gap-4">
            {availableTimeSlots.map((timeSlot) => (
              <button
                key={timeSlot}
                type="button"
                className={`text-white py-2 px-4 text-center border border-white rounded-lg ${
                  selectedTimeSlot === timeSlot
                    ? "bg-blue-500"
                    : "bg-transparent"
                }`}
                onClick={() => handleTimeSlotClick(timeSlot)}
              >
                {timeSlot}
              </button>
            ))}
          </div>
        </div>
        <Button
          type="button"
          disabled={!selectedTimeSlot}
          isLoading={false}
          onClick={() => alert(JSON.stringify(selectedTimeSlot))}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default BookingPage;
