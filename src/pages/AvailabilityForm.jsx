/* eslint-disable no-unused-vars */
import { useState } from 'react';
import API from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const shiftOptions = ['morning', 'afternoon', 'night'];
const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const AvailabilityForm = () => {
  const [form, setForm] = useState({
    preferredShifts: [],
    maxHoursPerWeek: 40,
    daysOff: []
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const toggleValue = (array, value) =>
    array.includes(value) ? array.filter(v => v !== value) : [...array, value];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await API.post('/availability', form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage(res.data.message);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setMessage('Error saving availability');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Set Your Availability</h2>

      <label>Preferred Shifts:</label>
      {shiftOptions.map(shift => (
        <label key={shift}>
          <input
            type="checkbox"
            checked={form.preferredShifts.includes(shift)}
            onChange={() =>
              setForm({ ...form, preferredShifts: toggleValue(form.preferredShifts, shift) })
            }
          />
          {shift}
        </label>
      ))}

      <label>Max Hours Per Week:</label>
      <input
        type="number"
        value={form.maxHoursPerWeek}
        onChange={e => setForm({ ...form, maxHoursPerWeek: Number(e.target.value) })}
        min={10}
        max={60}
      />

      <label>Days Off:</label>
      {days.map(day => (
        <label key={day}>
          <input
            type="checkbox"
            checked={form.daysOff.includes(day)}
            onChange={() =>
              setForm({ ...form, daysOff: toggleValue(form.daysOff, day) })
            }
          />
          {day}
        </label>
      ))}

      <button type="submit">Save Availability</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default AvailabilityForm;
