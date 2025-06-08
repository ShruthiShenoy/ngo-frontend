import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const DashboardNavigation = () => {
  const navigate = useNavigate();
  const { logout, userRole, userEmail } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavigationItems = () => {
    switch (userRole) {
      case 'super_admin':
        return (
          <>
            <Button color="inherit" onClick={() => navigate('/users')}>
              Manage Users
            </Button>
            <Button color="inherit" onClick={() => navigate('/invoices')}>
              All Invoices
            </Button>
          </>
        );

      case 'admin':
        return (
          <>
            <Button color="inherit" onClick={() => navigate('/invoices')}>
              Manage Invoices
            </Button>
            <Button color="inherit" onClick={() => navigate('/reports')}>
              Reports
            </Button>
            <Button color="inherit" onClick={() => navigate('/accounts')}>
              Funds
            </Button>
          </>
        );

      case 'volunteer':
        return (
          <>
            <Button color="inherit" onClick={() => navigate('/my-invoices')}>
              My Invoices
            </Button>
            <Button color="inherit" onClick={() => navigate('/my-reports')}>
              My Reports
            </Button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <AppBar position="static" sx={{ background: 'var(--color-primary)' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: 'var(--font-title)' }}
          onClick={() => navigate('/dashboard')}
          style={{ cursor: 'pointer' }}
        >
          NGO Financial Management
        </Typography>

        {getNavigationItems()}

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {userEmail}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 