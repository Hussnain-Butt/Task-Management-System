import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const TaskCard = ({ task, role, onTaskStatusChange, onEditTask, onDeleteTask }) => {
  const [isCompleted, setIsCompleted] = useState(task.status === 'completed');

  const handleCheckboxChange = () => {
    const newStatus = !isCompleted ? 'completed' : 'pending';
    setIsCompleted(!isCompleted);
    onTaskStatusChange(task._id, newStatus);
  };

  return (
    <div
      className={`shadow-lg rounded-lg p-6 border ${
        isCompleted ? 'border-green-500' : 'border-gray-300'
      }`}
      style={{ backgroundColor: task.bgColor || '#F9F9C5' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg uppercase tracking-wide text-gray-800">
          {task.title}
        </h3>
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
          <div
            key={index}
            className={`flex items-center ${
              isCompleted ? 'line-through text-gray-500' : ''
            }`}
          >
            <span className="mr-2 font-bold">{index + 1}</span>
            <span className="flex-1 border-b border-gray-400">{subtask.name}</span>
          </div>
        ))}
      </div>

      {role === 'admin' && (
        <div className="flex justify-between items-center mt-4">
          {/* Edit Button */}
          <button
            onClick={() => onEditTask(task._id)}
            className="border border-black from-blue-500 to-blue-600 text-black px-2 mt-5 py-2  shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition duration-300 ease-in-out font-semibold"
          >
            <CiEdit/>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDeleteTask(task._id)}
            className="border border-black from-red-500 to-red-600 text-black px-2 mt-5 py-2  shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition duration-300 ease-in-out font-semibold"
          >
            <MdDeleteOutline />

          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
