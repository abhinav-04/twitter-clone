// src/components/RightSidebar.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RightSidebar.css';
import User from '../types/User';

const RightSidebar: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch the list of users from the server
    axios.get('http://localhost:3000/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleFollow = (userId: string) => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:3000/api/follow',{
        'followingId':userId,
    },{
        headers:{
            'x-auth-token':token,
        },
    })
      .catch((error) => {
        console.error('Error following user:', error);
      });
  };

  const handleUnfollow = (userId: string) => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:3000/api/unfollow',{
        'followingId': userId,
    }, {
        headers: {
          'x-auth-token': token, 
        },
    })
      .catch((error) => {
        console.error('Error unfollowing user:', error);
      });
  };

  return (
    <div className="right-sidebar">
      <h2>Users to Follow</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id}>
            <span>{user.username}</span>
            <button onClick={() => handleFollow(user._id)}>Follow</button>
            <button onClick={() => handleUnfollow(user._id)}>Unfollow</button>
            {/* You can conditionally render "Follow" or "Unfollow" based on whether the user is already followed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightSidebar;
