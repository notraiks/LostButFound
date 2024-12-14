import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import '../App.css';
import './Login.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost/LostButFound/php/routes/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/');
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const fields = [
    { label: 'First Name', type: 'text', name: 'firstName', value: formData.firstName, onChange: handleInputChange, placeholder: 'Enter your first name', required: true },
    { label: 'Last Name', type: 'text', name: 'lastName', value: formData.lastName, onChange: handleInputChange, placeholder: 'Enter your last name', required: true },
    { label: 'Email', type: 'email', name: 'email', value: formData.email, onChange: handleInputChange, placeholder: 'Enter your email', required: true },
    { label: 'Phone Number', type: 'text', name: 'phoneNumber', value: formData.phoneNumber, onChange: handleInputChange, placeholder: 'Enter your phone number', required: true },
    { label: 'Password', type: 'password', name: 'password', value: formData.password, onChange: handleInputChange, placeholder: 'Enter your password', required: true },
    { label: 'Confirm Password', type: 'password', name: 'confirmPassword', value: formData.confirmPassword, onChange: handleInputChange, placeholder: 'Confirm your password', required: true },
  ];

  return (
    <div className="login-wrapper">
      <div className="left-content">
        <h1>Create Account</h1>
        <p>Join our community and help reunite lost items with their rightful owners.</p>
      </div>
      <LoginForm title="Lost, But Found" subtitle="Helping you reconnect with your belongings" fields={fields} buttonText="Register" onSubmit={handleCreateAccount} error={error} backAction={handleBack} />
    </div>
  );
};

export default CreateAccount;
