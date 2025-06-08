import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Link, Alert } from '@mui/material';
import { WebsiteHeader } from '../components/WebsiteHeader';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import type { UserRole } from '../contexts/AuthContext';

interface UserData {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveUserData = (userData: UserData) => {
    try {
      // Get existing users or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (existingUsers.some((user: UserData) => user.email === userData.email)) {
        throw new Error('Email already registered');
      }

      // Add new user
      existingUsers.push(userData);
      
      // Save updated users array
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Create user data object
    const userData: UserData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: 'volunteer',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save user data
    if (saveUserData(userData)) {
      // Store email for auto-fill in login page
      localStorage.setItem('lastRegisteredEmail', formData.email);
      // Show success message and redirect to login
      alert('Registration successful! Please wait for admin approval to login.');
      navigate('/login');
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
              Volunteer Registration
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
              Sign up to become a volunteer and help manage NGO finances
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
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="name"
                autoFocus
                value={formData.fullName}
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
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
                autoComplete="new-password"
                value={formData.password}
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
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
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
                Sign Up
              </Button>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ color: 'var(--color-accent)', mb: 1 }}>
                  Already have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: 'var(--color-primary)',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'var(--color-secondary)',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <WebsiteFooter />
    </Box>
  );
}; 