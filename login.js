// src/Login.js
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

function Login() {
  const { setUser } = useContext(UserContext);

  const handleLogin = () => {
    // Simulated login
    setUser({ name: 'Prathul', email: 'prathul@example.com' });
  };

  return <button onClick={handleLogin}>Login</button>;
}

export default Login;
