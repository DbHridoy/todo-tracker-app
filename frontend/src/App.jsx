import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import TaskModal from "./components/TaskModal";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskDates, setTaskDates] = useState([]);

  const refreshTaskDates = () => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || {};
    const activeDates = Object.keys(stored).filter((date) => stored[date].length > 0);
    setTaskDates(activeDates);
  };

  useEffect(() => {
    refreshTaskDates(); // initial load
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🗓️ Todo Tracker</h1>
      <Calendar onDateClick={setSelectedDate} taskDates={taskDates} />
      {selectedDate && (
        <TaskModal
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onTasksChange={refreshTaskDates}
        />
      )}
    </div>
  );
}

export default App;
