import React, { useState } from "react";
import { FiEdit, FiTrash2, FiCheck } from "react-icons/fi";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);

  const handleUpdate = () => {
    if (value.trim()) {
      onUpdate(task.id, value);
      setEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between border rounded px-3 py-2">
      {editing ? (
        <input
          className="flex-grow mr-2 border px-2 py-1 rounded"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
        />
      ) : (
        <span className="flex-grow">{task.text}</span>
      )}
      <div className="flex gap-2 items-center ml-2">
        {editing ? (
          <FiCheck className="cursor-pointer text-green-500" onClick={handleUpdate} />
        ) : (
          <FiEdit className="cursor-pointer" onClick={() => setEditing(true)} />
        )}
        <FiTrash2
          className="cursor-pointer text-red-500"
          onClick={() => onDelete(task.id)}
        />
      </div>
    </div>
  );
};

export default TaskItem;
