import React from "react";
import dayjs from "dayjs";

const Calendar = ({ onDateClick, taskDates }) => {
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const daysInMonth = today.daysInMonth();
  const firstDay = startOfMonth.day();

  const isTaskDate = (date) =>
    taskDates.includes(date.format("YYYY-MM-DD"));

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(dayjs().date(i));

  return (
    <div className="grid grid-cols-7 gap-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
        <div key={d} className="text-center font-semibold">{d}</div>
      ))}
      {daysArray.map((date, index) => (
        <div
          key={index}
          className={`relative h-16 border rounded flex items-center justify-center cursor-pointer hover:bg-blue-100 ${
            date?.isSame(today, "day") ? "bg-blue-200 font-bold" : ""
          }`}
          onClick={() => date && onDateClick(date.format("YYYY-MM-DD"))}
        >
          {date?.date()}
          {date && isTaskDate(date) && (
            <span className="absolute bottom-1 w-2 h-2 rounded-full bg-blue-500" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
