import React, { useState } from 'react';

const EditTaskModal = ({ task, onSave, onClose }) => {
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleInputChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...updatedTask.subtasks];
    updatedSubtasks[index].name = value;
    setUpdatedTask({ ...updatedTask, subtasks: updatedSubtasks });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Task</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Task Title */}
          <div>
            <label className="block font-semibold mb-1">Task Title</label>
            <input
              type="text"
              name="title"
              value={updatedTask.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter task title"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block font-semibold mb-1">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={updatedTask.deadline}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Background Color */}
          <div>
            <label className="block font-semibold mb-1">Background Color</label>
            <input
              type="color"
              name="bgColor"
              value={updatedTask.bgColor}
              onChange={handleInputChange}
              className="w-full h-10 p-1 border rounded"
            />
          </div>
        </div>

        {/* Subtasks */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg">Subtasks</h3>
          <div className="grid grid-cols-2 gap-4">
            {updatedTask.subtasks.map((subtask, index) => (
              <div key={index}>
                <label className="block font-semibold mb-1">{`Subtask ${index + 1}`}</label>
                <input
                  type="text"
                  value={subtask.name}
                  onChange={(e) => handleSubtaskChange(index, e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder={`Enter subtask ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded shadow hover:bg-gray-600 transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
            onClick={() => onSave(updatedTask)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
