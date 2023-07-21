import { useEffect, useState } from 'react';

const useGetTime = () => {
  const [dateList, setDateList] = useState<
    {
      selectedDayOfWeek: string;
      selectedDate: number;
      selectedMonth: string;
      selectedYear: number;
      formattedDate: string;
    }[]
  >([]);

  useEffect(() => {
    const today = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const newDateList: {
      selectedDayOfWeek: string;
      selectedDate: number;
      selectedMonth: string;
      selectedYear: number;
      formattedDate: string;
    }[] = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      const formattedDate = currentDate.toLocaleDateString(
        undefined,
        dateOptions
      );
      const selectedDayOfWeek = formattedDate.split(",")[0].trim();
      const selectedMonth = currentDate.toLocaleString("default", {
        month: "short",
      });
      const selectedDate = currentDate.getDate();
      const selectedYear = currentDate.getFullYear();

      newDateList.push({
        selectedDayOfWeek,
        selectedDate,
        selectedMonth,
        selectedYear, // Adding the year here
        formattedDate,
      });
    }

    setDateList(newDateList);
  }, []);
  return dateList
}

export default useGetTime;