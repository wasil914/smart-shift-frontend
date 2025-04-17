import { useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import API from '../utils/axios';
import { AuthContext } from '../context/AuthContext';

ModuleRegistry.registerModules([AllCommunityModule]);

const ShiftViewer = () => {
  const { user } = useContext(AuthContext);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/schedule', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('✅ Shifts from server:', res.data);
        setShifts(res.data);
      } catch (err) {
        console.error('❌ Error fetching shifts:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchShifts();
  }, [user]);

  const columnDefs = [
    { headerName: 'Day', field: 'day', sortable: true, filter: true },
    { headerName: 'Shift', field: 'shiftType', sortable: true, filter: true },
    {
      headerName: 'Team Members',
      field: 'assignedEmployees',
      valueGetter: (params) => {
        return (params.data.assignedEmployees || [])
          .filter(emp => {
            const empId = typeof emp === 'string' ? emp : emp._id;
            return user.role === 'admin' || empId?.toString() === user._id?.toString();
          })
          .map(emp => typeof emp === 'string' ? '[ID] ' + emp : emp.name)
          .join(', ');
      },
      autoHeight: true,
      wrapText: true,
    },
  ];

  if (loading) return <p>Loading shifts...</p>;

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <h2>
        {user?.role === 'admin'
          ? 'All Employee Shifts'
          : 'Your Assigned Shifts'}
      </h2>

      {shifts.length === 0 ? (
        <p>No shifts assigned this week.</p>
      ) : (
        <AgGridReact
          rowData={shifts}
          columnDefs={columnDefs}
          pagination={false}
          domLayout="autoHeight"
        />
      )}
    </div>
  );
};

export default ShiftViewer;
