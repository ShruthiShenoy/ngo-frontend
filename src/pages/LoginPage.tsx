import { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Link, Alert } from '@mui/material';
import { WebsiteHeader } from '../components/WebsiteHeader';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface UserData {
  fullName: string;
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the return URL from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    // Auto-fill email if user just registered
    const lastRegisteredEmail = localStorage.getItem('lastRegisteredEmail');
    if (lastRegisteredEmail) {
      setEmail(lastRegisteredEmail);
      // Clear the stored email
      localStorage.removeItem('lastRegisteredEmail');
    }
  }, []);

  const verifyCredentials = (email: string, password: string): boolean => {
    try {
      // Check mock credentials first
      if (email === 'admin@gmail.com' && password === 'password123') {
        return true;
      }
      
      // Then check registered users
      const users = JSON.parse(localStorage.getItem('users') || '[]') as UserData[];
      const user = users.find(u => u.email === email && u.password === password);
      return !!user;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Verify credentials
    if (verifyCredentials(email, password)) {
      // Set admin role for admin user
      if (email === 'admin@gmail.com') {
        login('admin');
      } else {
        login('user');
      }
      // Redirect to the return URL or dashboard
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password');
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
                onChange={(e) => setEmail(e.target.value)}
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
                    Sign up
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