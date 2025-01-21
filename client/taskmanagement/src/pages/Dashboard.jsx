import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [role, setRole] = useState(null);

  const fetchData = async () => {
    try {
      // Fetch the logged-in user's role and tasks
      const userResponse = await axios.get('/auth/users',{
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">My Tasks</h1>
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} role={role} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-xl">No tasks assigned to you yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
