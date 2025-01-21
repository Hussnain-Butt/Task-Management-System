import React, { useState } from 'react';

const AdminTaskCard = ({ task, onUpdateTask, onDeleteTask }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    subtasks: task.subtasks.map((subtask) => subtask.name),
  });

  // Handle task update form submission
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      title: editedTask.title,
      subtasks: editedTask.subtasks.map((name) => ({ name, status: 'pending' })),
    };
    onUpdateTask(task._id, updatedTask);
    setShowEditForm(false); // Close the edit form after updating
  };

  return (
    <div className="bg-amber-100 shadow-md rounded-md p-4 mb-4 border border-gray-300 max-w-md mx-auto">
      {/* Task Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg uppercase tracking-wide">{task.title}</h3>
      </div>

      {/* Assigned User */}
      <div className="mb-2 text-gray-700">
        <strong>Assigned to:</strong> {task.assignedTo?.name || 'Unassigned'}
      </div>

      {/* Subtasks */}
      <div className="space-y-2 mb-4">
        {task.subtasks.map((subtask, index) => (
          <div key={index} className="flex items-center">
            <span className="mr-2 font-bold">{index + 1}</span>
            <span className="flex-1 border-b border-gray-500">{subtask.name}</span>
          </div>
        ))}
      </div>

      {/* Edit and Delete Buttons */}
      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => setShowEditForm(!showEditForm)}
        >
          Edit Task
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => onDeleteTask(task._id)}
        >
          Delete Task
        </button>
      </div>

      {/* Edit Form */}
      {showEditForm && (
        <form className="mt-4" onSubmit={handleUpdateSubmit}>
          <input
            type="text"
            className="p-2 border rounded w-full mb-2"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            placeholder="Task Title"
          />
          {editedTask.subtasks.map((subtask, index) => (
            <input
              key={index}
              type="text"
              className="p-2 border rounded w-full mb-2"
              value={subtask}
              onChange={(e) => {
                const updatedSubtasks = [...editedTask.subtasks];
                updatedSubtasks[index] = e.target.value;
                setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
              }}
              placeholder={`Subtask ${index + 1}`}
            />
          ))}
          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminTaskCard;
