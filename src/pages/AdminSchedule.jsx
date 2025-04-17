

import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';


import API from '../utils/axios';

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const SHIFTS = ['morning', 'afternoon', 'night'];

ModuleRegistry.registerModules([AllCommunityModule]);

const AdminSchedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/schedule', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSchedule(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch schedule', err);
      }
    };
    fetchSchedule();
  }, []);

  const getEmployees = (day, shiftType) => {
    const shift = schedule.find(s => s.day === day && s.shiftType === shiftType);
    return shift?.assignedEmployees.map(emp => emp.name).join(', ') || '-';
  };

  const rowData = DAYS.map(day => ({
    day,
    morning: getEmployees(day, 'morning'),
    afternoon: getEmployees(day, 'afternoon'),
    night: getEmployees(day, 'night'),
  }));

  const columnDefs = [
    { headerName: 'Day', field: 'day', sortable: true, filter: true },
    { headerName: 'Morning', field: 'morning', sortable: true, filter: true },
    { headerName: 'Afternoon', field: 'afternoon', sortable: true, filter: true },
    { headerName: 'Night', field: 'night', sortable: true, filter: true },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <h2>Weekly Shift Schedule</h2>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={false}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default AdminSchedule;
