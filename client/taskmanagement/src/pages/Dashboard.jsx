import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import TaskCard from '../components/TaskCard';
import EditTaskModal from '../components/EditTaskModel';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [role, setRole] = useState(null);
  const [editingTask, setEditingTask] = useState(null); // Task being edited

  // Fetch user role and tasks
  const fetchData = async () => {
    try {
      const userResponse = await axios.get('/auth/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRole(userResponse.data.role);

      const tasksResponse = await axios.get('/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error.response || error.message);
    }
    console.log("tasks",tasks);
    
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(
        `/tasks/${taskId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error.response || error.message);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const saveEditedTask = async (updatedTask) => {
    try {
      const response = await axios.put(`/tasks/${updatedTask._id}`, updatedTask, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? response.data : task))
      );
      setEditingTask(null);
      alert('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error.response || error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await axios.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error.response || error.message);
    }
  };

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
              onEditTask={() => handleEditTask(task)}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={saveEditedTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
