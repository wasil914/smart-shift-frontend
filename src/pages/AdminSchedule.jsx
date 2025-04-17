import { useEffect, useState } from 'react';
import API from '../utils/axios';

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const SHIFTS = ['morning', 'afternoon', 'night'];

const AdminSchedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await API.get('/schedule');
        setSchedule(res.data);
      } catch (err) {
        console.error('Failed to fetch schedule', err);
      }
    };
    fetchSchedule();
  }, []);

  const getEmployees = (day, shiftType) => {
    const shift = schedule.find(s => s.day === day && s.shiftType === shiftType);
    return shift?.assignedEmployees.map(emp => emp.name).join(', ') || '-';
  };

  return (
    <div>
      <h2>Weekly Shift Schedule</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Day</th>
            {SHIFTS.map(s => <th key={s}>{s}</th>)}
          </tr>
        </thead>
        <tbody>
          {DAYS.map(day => (
            <tr key={day}>
              <td>{day}</td>
              {SHIFTS.map(shift => (
                <td key={shift}>
                  {getEmployees(day, shift)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSchedule;
