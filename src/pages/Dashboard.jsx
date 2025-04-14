import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>Your role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
