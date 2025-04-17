

import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout, refreshUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Ensure we always fetch the latest user info from the server (especially notification)
    refreshUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Your role: {user.role}</p>

      {/* ✅ Show notification if present */}
      {user.notification && (
        <div style={{ marginTop: '1rem', color: 'crimson', fontWeight: 'bold' }}>
          ⚠️ {user.notification}
        </div>
      )}

      {/* ✅ Only for employees */}
      {user.role === 'employee' && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={() => navigate('/shifts')} style={{ marginRight: '1rem' }}>
            View My Shifts
          </button>
          <button onClick={() => navigate('/availability')}>
            Update Availability
          </button>
        </div>
        
      )}

      <button onClick={logout} style={{ marginTop: '2rem' }}>Logout</button>
    </div>
  );
};

export default Dashboard;
