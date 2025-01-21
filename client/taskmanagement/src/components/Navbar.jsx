import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { auth, setAuth, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    setAuth({ user: null, token: null }); // Clear auth state
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Task Manager</Link>
        <div>
          {auth.user ? (
            <>
              {/* Show Admin Panel option only for admin users */}
              {isAdmin() && (
                <Link to="/admin" className="mx-2 hover:underline">
                  Admin Panel
                </Link>
              )}
              <Link to="/" className="mx-2 hover:underline">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="mx-2 hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Show Login/Register for unauthenticated users */}
              <Link to="/login" className="mx-2 hover:underline">
                Login
              </Link>
              <Link to="/register" className="mx-2 hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
