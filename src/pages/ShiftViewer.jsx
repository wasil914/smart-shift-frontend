import { useContext, useEffect, useState } from 'react';
import API from '../utils/axios';
import { AuthContext } from '../context/AuthContext';

const ShiftViewer = () => {
  const { user } = useContext(AuthContext);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const res = await API.get('/schedule');
        const allShifts = res.data;

        // Filter shifts where the logged-in user is assigned
        const userShifts = allShifts.filter(shift =>
          shift.assignedEmployees.some(emp => emp._id === user.id)
        );

        setShifts(userShifts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching shifts', err);
      }
    };

    fetchShifts();
  }, [user.id]);

  if (loading) return <p>Loading shifts...</p>;

  return (
    <div>
      <h2>Your Assigned Shifts</h2>
      {shifts.length === 0 ? (
        <p>No shifts assigned this week.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Day</th>
              <th>Shift</th>
              <th>Team Members</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift, index) => (
              <tr key={index}>
                <td>{shift.day}</td>
                <td>{shift.shiftType}</td>
                <td>
                  {shift.assignedEmployees.map(emp => emp.name).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShiftViewer;
