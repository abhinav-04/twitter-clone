// src/types/Tweet.ts

interface Tweet {
    _id: string;
    text: string;
    user: string;
    createdAt: string;
    userDetails: [{
      username: string; // Include any other user-related fields you need
    }];
  }
  
  export default Tweet;
  