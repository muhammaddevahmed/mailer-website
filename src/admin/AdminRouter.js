import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import ManagePackages from './pages/ManagePackages';
import UsersManagement from './pages/UsersManagement';
import UserEmailAnalytics from './pages/UserEmailAnalytics';
import ContactSubmissions from './pages/ContactSubmissions';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/sign" replace />;
  }
  return children;
};

const AdminRouter = ({ isAuthenticated, onLogout }) => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AdminLayout onLogout={onLogout}>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="packages" element={<ManagePackages />} />
                <Route path="users" element={<UsersManagement />} />
                <Route path="analytics" element={<UserEmailAnalytics />} />
                <Route path="contact" element={<ContactSubmissions />} />
                <Route index element={<Navigate to="dashboard" />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRouter;
