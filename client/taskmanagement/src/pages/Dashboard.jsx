import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [role, setRole] = useState(null);

  // Fetch user role and tasks
  const fetchData = async () => {
    try {
      // Fetch the logged-in user's role
      const userResponse = await axios.get('/auth/users', {
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
      // Update task status in the backend
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

  // Handle edit task (for example, open modal for editing)
  const handleEditTask = (taskId) => {
    console.log('Edit Task:', taskId);
    // Implement your edit logic here (e.g., open a modal for editing the task)
  };

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      // Delete task in the backend
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
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">My Tasks</h1>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-600">No tasks available.</p>
      ) : (
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
      )}
    </div>
  );
};

export default Dashboard;
