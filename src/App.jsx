import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ShiftViewer from './pages/ShiftViewer';
import AdminSchedule from './pages/AdminSchedule';

import AvailabilityForm from './pages/AvailabilityForm';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Employee-Only Routes */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />

      <Route path="/shifts" element={
        <PrivateRoute>
          <ShiftViewer />
        </PrivateRoute>
      } />

      <Route path="/availability" element={
        <PrivateRoute>
          <AvailabilityForm />
        </PrivateRoute>
      } />

      {/* Admin-Only Route */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />

      <Route path="/admin/schedule" element={
       <AdminRoute>
         <AdminSchedule />
       </AdminRoute>
        } />

    </Routes>
  );
}

export default App;
