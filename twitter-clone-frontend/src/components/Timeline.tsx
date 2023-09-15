// src/components/Timeline.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweet from '../types/Tweet';


// Basic CSS styles for demonstration (customize as needed)
import './Timeline.css';
import SideNav from './SideNav';
import RightSidebar from './RightSidebar';

const Timeline: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [newTweet, setNewTweet] = useState<string>('');

  const fetchTweets = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/api/timeline', {
      headers: {
        'x-auth-token': token, 
      },
    })
      .then((response) => {
        setTweets(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tweets:', error);
      });
  };

  const postTweet = () => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:3000/api/tweets', { text: newTweet }, {
      headers: {
        'x-auth-token': token, 
      },
    })
      .then(() => {
        setNewTweet('');
        fetchTweets();
      })
      .catch((error) => {
        console.error('Error posting tweet:', error);
      });
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div className="timeline-container">
        <SideNav />
      <div className="timeline">
        <div className="tweet-form">
          <textarea
            placeholder="What's happening?"
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
          />
          <button onClick={postTweet}>Tweet</button>
        </div>
        <div className="tweets">
        {tweets.map((tweet, index) => (
  <div key={index} className="tweet-card">
    <p className="tweet-author"><strong>{tweet.userDetails[0].username}</strong></p>
    <p className="tweet-text">{tweet.text}</p>
    <div className="tweet-options">
      <span><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg> 12</span>
      <span><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg> 7</span>
      <span><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg> 15</span>
    </div>
  </div>
))}

        </div>
      </div>
        <RightSidebar/>
    </div>
  );
};

export default Timeline;
