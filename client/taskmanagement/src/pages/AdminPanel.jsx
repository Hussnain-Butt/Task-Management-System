import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [taskGroup, setTaskGroup] = useState({
    title: '',
    subtasks: ['', '', '', ''],
    assignedTo: '',
    deadline: '',
    bgColor: '#F9F9C5',
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/auth/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createTaskGroup = async () => {
    try {
      const payload = {
        title: taskGroup.title,
        subtasks: taskGroup.subtasks.map((name) => ({ name, status: 'pending' })),
        assignedTo: taskGroup.assignedTo,
        deadline: taskGroup.deadline,
        bgColor: taskGroup.bgColor,
      };

      await axios.post('/tasks', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      alert('Task group created successfully!');
      setTaskGroup({ title: '', subtasks: ['', '', '', ''], assignedTo: '', deadline: '', bgColor: '#F9F9C5' });
    } catch (error) {
      console.error('Error creating task group:', error.response || error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Assign Task Group</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
          <input
            type="text"
            placeholder="Task Title"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={taskGroup.title}
            onChange={(e) => setTaskGroup({ ...taskGroup, title: e.target.value })}
          />
        </div>

        {taskGroup.subtasks.map((subtask, index) => (
          <div className="mb-6" key={index}>
            <label className="block text-gray-700 font-semibold mb-2">{`Subtask ${index + 1}`}</label>
            <input
              type="text"
              placeholder={`Subtask ${index + 1}`}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={subtask}
              onChange={(e) => {
                const updatedSubtasks = [...taskGroup.subtasks];
                updatedSubtasks[index] = e.target.value;
                setTaskGroup({ ...taskGroup, subtasks: updatedSubtasks });
              }}
            />
          </div>
        ))}

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Assign To</label>
          <select
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setTaskGroup({ ...taskGroup, assignedTo: e.target.value })}
            value={taskGroup.assignedTo}
          >
            <option value="">Select a User</option>
            {Array.isArray(users) &&
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Deadline</label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={taskGroup.deadline}
            onChange={(e) => setTaskGroup({ ...taskGroup, deadline: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Select Background Color</label>
          <input
            type="color"
            className="w-16 h-10 border rounded-lg cursor-pointer"
            value={taskGroup.bgColor}
            onChange={(e) => setTaskGroup({ ...taskGroup, bgColor: e.target.value })}
          />
        </div>

        <button
          onClick={createTaskGroup}
          className="w-full bg-indigo-500 text-white py-3 rounded-lg shadow-lg font-semibold hover:bg-indigo-600 transition duration-200"
        >
          Create Task Group
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
