import React, { useState, useContext } from 'react';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProfileSettings = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [bio, setBio] = useState(auth.user?.bio || '');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      });

      // Update the AuthContext with the new user data
      const updatedUser = response.data.user;
      setAuth((prev) => ({ ...prev, user: updatedUser }));

      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile.');
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Profile Settings</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 border rounded"
          onChange={handleFileChange}
        />
      </div>
      <button
        onClick={handleSaveChanges}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfileSettings;
