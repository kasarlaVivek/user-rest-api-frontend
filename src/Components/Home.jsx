import React from 'react';
import { useNavigate } from 'react-router';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <h1 className="hero-title">Welcome to Premium API</h1>
      <p className="hero-subtitle">
        Manage your users with our state-of-the-art dashboard featuring a sleek, dark-mode glassmorphic design.
      </p>
      <button className="btn btn-primary" onClick={() => navigate('/users-list')} style={{ fontSize: '1.2rem', padding: '1rem 2rem', borderRadius: '50px' }}>
        Get Started
      </button>
    </div>
  )
}

export default Home;