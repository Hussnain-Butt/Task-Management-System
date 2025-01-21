import React, { useState } from 'react';

const TaskCard = ({ task, role, onTaskStatusChange, onEditTask, onDeleteTask }) => {
  const [isCompleted, setIsCompleted] = useState(task.status === 'completed');

  const handleCheckboxChange = () => {
    const newStatus = !isCompleted ? 'completed' : 'pending';
    setIsCompleted(!isCompleted);
    onTaskStatusChange(task._id, newStatus);
  };

  return (
    <div
      className={`shadow-md rounded-md p-4 border ${
        isCompleted ? 'border-green-500' : 'border-gray-300'
      }`}
      style={{ backgroundColor: task.bgColor || '#F9F9C5' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg uppercase tracking-wide">{task.title}</h3>
        <input
          type="checkbox"
          checked={isCompleted}
          className="h-5 w-5 cursor-pointer"
          onChange={handleCheckboxChange}
        />
      </div>

      {isCompleted && (
        <div className="mb-4 text-green-500 font-semibold text-sm text-center">
          Completed
        </div>
      )}

      <div className="space-y-2 mb-4">
        {task.subtasks.map((subtask, index) => (
          <div key={index} className={`flex items-center ${isCompleted ? 'line-through text-gray-500' : ''}`}>
            <span className="mr-2 font-bold">{index + 1}</span>
            <span className="flex-1 border-b border-gray-500">{subtask.name}</span>
          </div>
        ))}
      </div>

      {role === 'admin' && (
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
            onClick={() => onEditTask(task._id)}
          >
            Edit Task
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition duration-200"
            onClick={() => onDeleteTask(task._id)}
          >
            Delete Task
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
