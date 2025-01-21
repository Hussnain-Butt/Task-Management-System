import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminHero = () => {
  const { auth } = useContext(AuthContext); // Access user details from context

  return (
    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-10 px-6 rounded-md shadow-lg mb-6">
      <h1 className="text-4xl font-bold">
        Welcome, {auth.user?.name || 'Admin'}!
      </h1>
      <p className="text-lg mt-2">
        Manage tasks, assign them to users, and track their progress effortlessly.
      </p>
    </div>
  );
};

export default AdminHero;
