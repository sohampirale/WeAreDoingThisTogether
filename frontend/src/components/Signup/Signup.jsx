import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await axios.post('https://your-backend-url/api/v1/user/register', {
        username,
        password
      }, {
        withCredentials: true
      });
      console.log("Signup success:", res.data);
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 border mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full bg-green-500 text-white p-2 rounded" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}

export default Signup;
