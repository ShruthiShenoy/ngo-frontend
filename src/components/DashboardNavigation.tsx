import { Box, Button, Container, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const DashboardNavigation = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userEmail = localStorage.getItem('currentUserEmail');

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

  return (
    <AppBar position="static" sx={{ background: 'var(--color-primary)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/home"
            sx={{
              flexGrow: 1,
              fontFamily: 'var(--font-title)',
              color: 'var(--color-primary-contrast)',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            NGO FMS
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              component={RouterLink}
              to="/dashboard"
              sx={{
                color: 'var(--color-primary-contrast)',
                '&:hover': { color: 'var(--color-soft)' },
              }}
            >
              Dashboard
            </Button>
            <Button
              component={RouterLink}
              to="/invoices"
              sx={{
                color: 'var(--color-primary-contrast)',
                '&:hover': { color: 'var(--color-soft)' },
              }}
            >
              Invoices
            </Button>
            <Button
              component={RouterLink}
              to="/accounts"
              sx={{
                color: 'var(--color-primary-contrast)',
                '&:hover': { color: 'var(--color-soft)' },
              }}
            >
              Accounts
            </Button>
            <Button
              component={RouterLink}
              to="/reports"
              sx={{
                color: 'var(--color-primary-contrast)',
                '&:hover': { color: 'var(--color-soft)' },
              }}
            >
              Reports
            </Button>

            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
              sx={{ ml: 2 }}
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
              <MenuItem sx={{ fontFamily: 'var(--font-body)' }}>
                {userEmail}
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)' }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}; 