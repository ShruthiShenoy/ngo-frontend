import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

// Import your pages here
// import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { WebsitePage } from './pages/WebsitePage';
import { DashboardPage } from './pages/DashboardPage';
import { InvoicesPage } from './pages/InvoicesPage';
import { AccountsPage } from './pages/AccountsPage';
import { ReportsPage } from './pages/ReportsPage';
import { AddInvoicePage } from './pages/AddInvoicePage';
import { NotAuthorized } from './pages/NotAuthorized';
import { UserManagementPage } from './pages/UserManagementPage';

// PublicRoute component — redirects logged in users from public pages
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AddAccountPage = () => (
  <div style={{ padding: 32, fontFamily: 'var(--font-title)', color: 'var(--color-primary)' }}>
    <h2>Add Account</h2>
    <p>This is a placeholder for the Add Account form.</p>
  </div>
);

const GenerateReportPage = () => (
  <div style={{ padding: 32, fontFamily: 'var(--font-title)', color: 'var(--color-primary)' }}>
    <h2>Generate Report</h2>
    <p>This is a placeholder for the Generate Report form.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<WebsitePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          {/* Super Admin routes */}
          <Route
            path="/users"
            element={
              <PrivateRoute requiredRole="super_admin">
                <UserManagementPage />
              </PrivateRoute>
            }
          />

          {/* Admin and Super Admin routes */}
          <Route
            path="/invoices"
            element={
              <PrivateRoute requiredPermission="view_all_invoices">
                <InvoicesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoices/new"
            element={
              <PrivateRoute requiredPermission="create_invoices">
                <AddInvoicePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute requiredPermission="view_all_reports">
                <ReportsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <PrivateRoute requiredPermission="view_all_funds">
                <AccountsPage />
              </PrivateRoute>
            }
          />

          {/* Volunteer routes */}
          <Route
            path="/my-invoices"
            element={
              <PrivateRoute requiredPermission="view_invoices">
                <InvoicesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-reports"
            element={
              <PrivateRoute requiredPermission="view_own_reports">
                <ReportsPage />
              </PrivateRoute>
            }
          />

          {/* Not authorized page */}
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
