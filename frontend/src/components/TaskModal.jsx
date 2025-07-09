import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

const TaskModal = ({ date, onClose, onTasksChange }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage (simulate a simple backend)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || {};
    setTasks(stored[date] || []);
  }, [date]);

 const saveTasks = (updatedTasks) => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || {};
    stored[date] = updatedTasks;
    localStorage.setItem("tasks", JSON.stringify(stored));
    setTasks(updatedTasks);
    onTasksChange(); // ✅ notify parent to refresh taskDates
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const updatedTasks = [...tasks, { id: Date.now(), text: newTask }];
    saveTasks(updatedTasks);
    setNewTask("");
  };

  const updateTask = (id, newText) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    saveTasks(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    saveTasks(updated);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Tasks for {date}</h2>

        <div className="flex mb-4 gap-2">
          <input
            className="flex-grow border px-3 py-2 rounded"
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto space-y-2">
          {tasks.length ? (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center">No tasks yet.</p>
          )}
        </div>

        <button
          className="mt-6 text-sm text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
