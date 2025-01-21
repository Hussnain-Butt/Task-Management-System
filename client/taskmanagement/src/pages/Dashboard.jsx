import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [role, setRole] = useState(null);
  const [editingTask, setEditingTask] = useState(null); // State for the task being edited

  // Fetch user role and tasks
  const fetchData = async () => {
    try {
      // Fetch the logged-in user's role
      const userResponse = await axios.get('/auth/users ', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRole(userResponse.data.role); // Set role from response

      // Fetch tasks
      const tasksResponse = await axios.get('/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  // Handle task status change
  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(
        `/tasks/${taskId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      // Update task status locally
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error.response || error.message);
    }
  };

  // Handle edit task (open modal)
  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    setEditingTask(taskToEdit); // Set the task being edited
  };

  // Handle edit form submission
  const handleEditSubmit = async (updatedTask) => {
    try {
      const response = await axios.put(`/tasks/${updatedTask._id}`, updatedTask, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      // Update the task in local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? { ...response.data } : task
        )
      );

      setEditingTask(null); // Close the modal
      alert('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error.response || error.message);
    }
  };

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await axios.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      // Remove the task from local state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
       {role == 'admin' ? 
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Admin Task </h1>
      :
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">My Tasks</h1>

      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            role={role}
            onTaskStatusChange={handleTaskStatusChange}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditSubmit(editingTask);
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Background Color</label>
                <input
                  type="color"
                  value={editingTask.bgColor}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, bgColor: e.target.value })
                  }
                  className="w-16 h-10 cursor-pointer"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-4 hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
