
import { useEffect, useState } from 'react';
import API from '../utils/axios';

const AdminSettings = () => {
  const [config, setConfig] = useState({ minEmployeesPerShift: 1, maxEmployeesPerShift: 3 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      const res = await API.get('/config');
      setConfig(res.data);
    };
    fetchConfig();
  }, []);

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/config', config);
    setMessage('Config updated successfully!');
  };

  return (
    <div>
      <h2>Shift Configuration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Min Employees Per Shift:
          <input
            type="number"
            name="minEmployeesPerShift"
            value={config.minEmployeesPerShift}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Max Employees Per Shift:
          <input
            type="number"
            name="maxEmployeesPerShift"
            value={config.maxEmployeesPerShift}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default AdminSettings;
