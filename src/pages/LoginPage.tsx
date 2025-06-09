import { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Link, Alert, Tabs, Tab } from '@mui/material';
import { WebsiteHeader } from '../components/WebsiteHeader';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../contexts/AuthContext';

interface UserData {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}

// Define initial users outside of component to avoid recreation
const initialUsers: UserData[] = [
  { fullName: 'Super Admin', email: 'superadmin@gmail.com', password: 'password123', role: 'super_admin' },
  { fullName: 'Admin User', email: 'admin@gmail.com', password: 'password123', role: 'admin' },
  { fullName: 'Volunteer User', email: 'volunteer@gmail.com', password: 'password123', role: 'volunteer' },
];

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the return URL from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    // Initialize dummy users if they don't exist in localStorage
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify(initialUsers));
    } else {
      // Ensure the dummy users exist in the stored users
      const users = JSON.parse(storedUsers) as UserData[];
      const missingDummyUsers = initialUsers.filter(user => 
        !users.some(u => u.email === user.email)
      );
      
      if (missingDummyUsers.length > 0) {
        const updatedUsers = [...users, ...missingDummyUsers];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    }

    // Auto-fill email if user just registered
    const lastRegisteredEmail = localStorage.getItem('lastRegisteredEmail');
    if (lastRegisteredEmail) {
      setEmail(lastRegisteredEmail);
      // Clear the stored email
      localStorage.removeItem('lastRegisteredEmail');
    }
  }, []);

  const verifyCredentials = (
    email: string,
    password: string,
    selectedRoleFromTab: UserRole
  ): { success: boolean; role: UserRole | null } => {
    try {
      // Check super admin credentials
      if (email === 'superadmin@gmail.com' && password === 'password123') {
        return selectedRoleFromTab === 'super_admin' ? { success: true, role: 'super_admin' } : { success: false, role: null };
      }
      
      // Check admin credentials
      if (email === 'admin@gmail.com' && password === 'password123') {
        return selectedRoleFromTab === 'admin' ? { success: true, role: 'admin' } : { success: false, role: null };
      }
      
      // Check volunteer credentials
      if (email === 'volunteer@gmail.com' && password === 'password123') {
        return selectedRoleFromTab === 'volunteer' ? { success: true, role: 'volunteer' } : { success: false, role: null };
      }
      
      // Check registered users
      const users = JSON.parse(localStorage.getItem('users') || '[]') as UserData[];
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        return user.role === selectedRoleFromTab ? { success: true, role: user.role } : { success: false, role: null };
      }
      
      return { success: false, role: null };
    } catch {
      return { success: false, role: null };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const rolesMap: Record<number, UserRole> = {
      0: 'volunteer',
      1: 'admin',
      2: 'super_admin',
    };
    const selectedRoleFromTab = rolesMap[activeTab];

    // Verify credentials
    const { success, role } = verifyCredentials(email, password, selectedRoleFromTab);
    
    if (success && role) {
      login(role, email);
      // Redirect to the return URL or dashboard
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password for the selected role');
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);

    // Auto-select tab based on email
    if (value === 'superadmin@gmail.com') {
      setActiveTab(2); // Super Admin tab
    } else if (value === 'admin@gmail.com') {
      setActiveTab(1); // Admin tab
    } else if (value === 'volunteer@gmail.com') {
      setActiveTab(0); // Volunteer tab
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--color-base)',
      }}
    >
      <WebsiteHeader />
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', py: 8 }}>
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'var(--color-soft)',
              borderRadius: 2,
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontFamily: 'var(--font-title)',
                color: 'var(--color-primary)',
                fontWeight: 700,
                mb: 3,
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-accent)',
                mb: 4,
                textAlign: 'center',
              }}
            >
              Sign in to access your NGO Financial Management System
            </Typography>

            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Volunteer" />
              <Tab label="Admin" />
              <Tab label="Super Admin" />
            </Tabs>

            {/* Dummy credentials helper text */}
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-accent)',
                mb: 2,
                textAlign: 'center',
                fontSize: '0.8rem',
              }}
            >
              Test Credentials:
              <br />
              Super Admin: superadmin@gmail.com / password123
              <br />
              Admin: admin@gmail.com / password123
              <br />
              Volunteer: volunteer@gmail.com / password123
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'var(--color-primary)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--color-secondary)',
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'var(--color-primary)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--color-secondary)',
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: 'var(--color-primary)',
                  color: 'var(--color-primary-contrast)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': {
                    background: 'var(--color-secondary)',
                    color: 'var(--color-primary-contrast)',
                  },
                }}
              >
                Sign In
              </Button>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ color: 'var(--color-accent)', mb: 1 }}>
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/signup"
                    sx={{
                      color: 'var(--color-primary)',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'var(--color-secondary)',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign up as Volunteer
                  </Link>
                </Typography>
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body2"
                  sx={{
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'var(--color-secondary)',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <WebsiteFooter />
    </Box>
  );
}; 