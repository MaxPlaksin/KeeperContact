// src/pages/HomePage.js
import React, { useState } from 'react';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // тут будет логика входа, пока просто alert
    alert(`Login with ${username} / ${password}`);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Welcome to KeeperContact</h1>

      <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
        <img
          src="/slider/20250708_1719_Mountain Drilling Adventure_simple_compose_01jzn6fxyqfjtsjv67nh5nzmfx.gif"
          alt="Gif 1"
          style={{ maxWidth: 200 }}
        />
        <img
          src="/slider/20250708_1719_Mountain Drilling Adventure_simple_compose_01jzn6fxytfz998djw7ayzpdp2.gif"
          alt="Gif 2"
          style={{ maxWidth: 200 }}
        />
        <img
          src="/slider/20250708_1745_Drilling Rig Journey_simple_compose_01jzn8022zf70byma587xr2e2q.gif"
          alt="Gif 3"
          style={{ maxWidth: 200 }}
        />
        <img
          src="/slider/20250708_1745_Drilling Rig Journey_simple_compose_01jzn80236erra0jt6ks3cfpt9.gif"
          alt="Gif 4"
          style={{ maxWidth: 200 }}
        />
      </div>

      <div style={{ maxWidth: 300 }}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button onClick={handleLogin} style={{ width: '100%', padding: 10 }}>
          Log In
        </button>
      </div>
    </div>
  );
}
