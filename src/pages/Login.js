import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const demoUser = {
  email: 'demo@example.com',
  password: 'demopassword',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === demoUser.email && password === demoUser.password) {
      alert('Login successful! Welcome demo user.');
      // Redirect to home or dashboard
      navigate('/');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="block mb-2 font-semibold" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 rounded"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        Demo account: demo@example.com / demopassword
      </div>
    </div>
  );
};

export default Login;
