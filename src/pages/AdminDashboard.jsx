
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Only accessible by users with the admin role.</p>

      {/* ✅ Link-style fallback still retained */}
      <p>
        <Link to="/admin/settings">Configure Shift Limits (Link)</Link>
      </p>

      {/* ✅ Admin navigation buttons */}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => navigate('/admin/settings')} style={{ marginRight: '1rem' }}>
          Configure Shift Limits
        </button>
        <button onClick={() => navigate('/admin/schedule')}>
          View Full Schedule
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
