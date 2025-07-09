import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import TaskModal from "./components/TaskModal";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskDates, setTaskDates] = useState([]);

  const refreshTaskDates = async () => {
    try {
      const response = await fetch("api/tasks");
      if (!response.ok) throw new Error("Failed to fetch task dates");
      const data = await response.json();
      setTaskDates(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshTaskDates(); // initial load
  }, [taskDates]);

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
