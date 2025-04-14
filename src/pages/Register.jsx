import { useState } from 'react';
import API from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Register;
