import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

// Import your pages here
import { HomePage } from './pages/HomePage';
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

// PublicRoute component — redirects logged in users from public pages
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
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
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute requiredRole="admin">
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <PrivateRoute requiredRole="admin">
                <InvoicesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoices/new"
            element={
              <PrivateRoute requiredRole="admin">
                <AddInvoicePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <PrivateRoute requiredRole="accountant">
                <AccountsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/accounts/new"
            element={
              <PrivateRoute requiredRole="accountant">
                <AddAccountPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute requiredRole="manager">
                <ReportsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports/new"
            element={
              <PrivateRoute requiredRole="manager">
                <GenerateReportPage />
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
