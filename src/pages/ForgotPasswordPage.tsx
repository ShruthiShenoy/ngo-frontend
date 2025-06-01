import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Link, Alert } from '@mui/material';
import { WebsiteHeader } from '../components/WebsiteHeader';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Here you would typically make an API call to handle password reset
    // For now, we'll just simulate a successful request
    if (email) {
      setSuccess(true);
      // You can add actual API integration here
    } else {
      setError('Please enter your email address');
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
              Reset Password
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
              Enter your email address and we'll send you instructions to reset your password
            </Typography>

            {success ? (
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Alert severity="success" sx={{ mb: 3 }}>
                  Password reset instructions have been sent to your email
                </Alert>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    background: 'var(--color-primary)',
                    color: 'var(--color-primary-contrast)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'var(--color-secondary)',
                    },
                  }}
                >
                  Return to Login
                </Button>
              </Box>
            ) : (
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
                    },
                  }}
                >
                  Reset Password
                </Button>
                <Box sx={{ textAlign: 'center' }}>
                  <Link
                    component={RouterLink}
                    to="/login"
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
                    Back to Login
                  </Link>
                </Box>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
      <WebsiteFooter />
    </Box>
  );
}; 