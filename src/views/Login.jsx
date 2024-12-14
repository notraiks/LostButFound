import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import LoginForm from '../components/forms/LoginForm';
import '../App.css';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext); 

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost/LostButFound/php/routes/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('authToken', data.user_id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        handleLogin(); 
        navigate('/home');
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  const fields = [
    { label: 'Email', type: 'email', name: 'email', value: email, onChange: (e) => setEmail(e.target.value), placeholder: 'Enter your email', required: true },
    { label: 'Password', type: 'password', name: 'password', value: password, onChange: (e) => setPassword(e.target.value), placeholder: 'Enter your password', required: true },
  ];

  const options = [
    { href: '/create-account', text: 'Create account' },
    { href: '/forgot-password', text: 'Forgot Password?' },
  ];

  return (
    <div className="login-wrapper">
      <div className="left-content">
        <h1>Welcome!</h1>
        <p>
          Our mission is to reunite lost items with their rightful owners swiftly and efficiently.
          Join us in fostering a supportive community where everyone looks out for one another.
        </p>
      </div>
      <LoginForm
        title="Lost, But Found"
        subtitle="Helping you reconnect with your belongings"
        fields={fields}
        buttonText="Login"
        onSubmit={handleLoginSubmit}
        error={error}
        options={options}
      />
    </div>
  );
};

export default Login;
