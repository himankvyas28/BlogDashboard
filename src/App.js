import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('all'); // NEW: Selected user state

  useEffect(() => {
    const fetchData = async () => {
      const postRes = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
      const postData = await postRes.json();

      const userRes = await fetch('https://jsonplaceholder.typicode.com/users');
      const userData = await userRes.json();

      setPosts(postData);
      setUsers(userData);
    };

    fetchData();
  }, []);

  // Function to get user name by userId
  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  // NEW: Filter posts based on selected user
  const filteredPosts = selectedUserId === 'all'
    ? posts
    : posts.filter(post => post.userId.toString() === selectedUserId);

  return (
    <div className="container">
      <h1>Blog Dashboard</h1>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <div className="filter-left">
          <label>Filter by User:</label>
          <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
            <option value="all">All Users</option>
            {users.map(user => (
              <option key={user.id} value={user.id.toString()}>{user.name}</option>
            ))}
          </select>
        </div>

        <button className="add-post">+ Add New Post</button>
      </div>

      {/* Post List */}
      <div className="post-list">
        <h2>Post List ({filteredPosts.length} posts)</h2>

        {filteredPosts.map(post => (
          <div className="post-card" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-meta">
              By: {getUserName(post.userId)}
              <span className="badge">Post #{post.id}</span>
            </p>
            <p className="post-summary">
              {post.body}
            </p>
            <button className="view-comments-btn">
              💬 View Comments
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
