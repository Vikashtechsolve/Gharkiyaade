import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Add registration logic here
    alert(`Registering with email: ${email}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
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
        <label className="block mb-2 font-semibold" htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
