import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://task-management-system-frontend-phi.vercel.app/auth/login')
      localStorage.setItem('token', response.data.token);
      setAuth({ user: response.data.user, token: response.data.token }); // Update AuthContext
      navigate('/'); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded p-4">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button className="bg-blue-500 text-white w-full p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
