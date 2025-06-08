import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { userRole, hasPermission } = useAuth();

  const getDashboardContent = () => {
    switch (userRole) {
      case 'super_admin':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%', background: 'var(--color-soft)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary)' }}>
                  User Management
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontFamily: 'var(--font-body)' }}>
                  Manage users, approve volunteers, and oversee the entire system.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/users')}
                  sx={{
                    background: 'var(--color-primary)',
                    color: 'var(--color-primary-contrast)',
                    fontFamily: 'var(--font-body)',
                    '&:hover': { background: 'var(--color-secondary)' },
                  }}
                >
                  Manage Users
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%', background: 'var(--color-soft)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary)' }}>
                  Invoice Management
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontFamily: 'var(--font-body)' }}>
                  View and manage all invoices across the organization.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/invoices')}
                  sx={{
                    background: 'var(--color-primary)',
                    color: 'var(--color-primary-contrast)',
                    fontFamily: 'var(--font-body)',
                    '&:hover': { background: 'var(--color-secondary)' },
                  }}
                >
                  View All Invoices
                </Button>
              </Paper>
            </Grid>
          </Grid>
        );

      case 'admin':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%', background: 'var(--color-soft)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary)' }}>
                  Invoice Management
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontFamily: 'var(--font-body)' }}>
                  Approve and manage invoices from volunteers.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/invoices')}
                  sx={{
                    background: 'var(--color-primary)',
                    color: 'var(--color-primary-contrast)',
                    fontFamily: 'var(--font-body)',
                    '&:hover': { background: 'var(--color-secondary)' },
                  }}
                >
                  Manage Invoices
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%', background: 'var(--color-soft)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary)' }}>
                  Reports
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontFamily: 'var(--font-body)' }}>
                  View and manage financial reports.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/reports')}
                  sx={{
                    background: 'var(--color-primary)',
                    color: 'var(--color-primary-contrast)',
                    fontFamily: 'var(--font-body)',
                    '&:hover': { background: 'var(--color-secondary)' },
                  }}
                >
                  View Reports
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%', background: 'var(--color-soft)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary)' }}>
                  Fund Management
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontFamily: 'var(--font-body)' }}>
                  Manage and track organization funds.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/accounts')}
                  sx={{
                    background: 'var(--color-primary)',
                    color: 'var(--color-primary-contrast)',
                    fontFamily: 'var(--font-body)',
                    '&:hover': { background: 'var(--color-secondary)' },
                  }}
                >
                  Manage Funds
                </Button>
              </Paper>
            </Grid>
          </Grid>
        );

      case 'volunteer':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%', background: 'var(--color-soft)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary)' }}>
                  My Invoices
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontFamily: 'var(--font-body)' }}>
                  Create and view all submitted invoices.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/invoices')}
                  sx={{
                    background: 'var(--color-primary)',
                    color: 'var(--color-primary-contrast)',
                    fontFamily: 'var(--font-body)',
                    '&:hover': { background: 'var(--color-secondary)' },
                  }}
                >
                  View All Invoices
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%', background: 'var(--color-soft)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary)' }}>
                  My Reports
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontFamily: 'var(--font-body)' }}>
                  Create and view your submitted reports.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/my-reports')}
                  sx={{
                    background: 'var(--color-primary)',
                    color: 'var(--color-primary-contrast)',
                    fontFamily: 'var(--font-body)',
                    '&:hover': { background: 'var(--color-secondary)' },
                  }}
                >
                  View My Reports
                </Button>
              </Paper>
            </Grid>
          </Grid>
        );

      default:
        return (
          <Typography variant="body1" sx={{ fontFamily: 'var(--font-body)' }}>
            Please contact the administrator to set up your account.
          </Typography>
        );
    }
  };

  return (
    <DashboardLayout title="Dashboard">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: 'var(--font-title)',
            color: 'var(--color-primary)',
            fontWeight: 700,
          }}
        >
          Welcome to NGO Financial Management System
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-main)',
          }}
        >
          Manage your NGO's finances efficiently and effectively.
        </Typography>
      </Box>
      {getDashboardContent()}
    </DashboardLayout>
  );
}; 