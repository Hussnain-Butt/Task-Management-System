import React, { useState, useEffect } from 'react';

const Notification = ({ notifications }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notifications.length > 0) {
      setShow(true);
      setTimeout(() => setShow(false), 5000); // Auto-hide notifications after 5 seconds
    }
  }, [notifications]);

  return (
    <div>
      {show && notifications.length > 0 && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-md">
          <h3 className="font-bold">Notifications</h3>
          <ul>
            {notifications.map((note, index) => (
              <li key={index}>{note.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
