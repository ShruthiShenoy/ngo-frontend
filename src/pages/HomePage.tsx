import { Box, Container, Typography, Button } from '@mui/material';
import { WebsiteHeader } from '../components/WebsiteHeader';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { DashboardNavigation } from '../components/DashboardNavigation';
import { Link as RouterLink } from 'react-router-dom';

interface Feature {
  title: string;
  description: string;
  link?: string;
}

export const HomePage = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const authenticatedFeatures: Feature[] = [
    {
      title: 'Manage Invoices',
      description: 'Create and track invoices',
      link: '/invoices',
    },
    {
      title: 'View Accounts',
      description: 'Monitor your accounts',
      link: '/accounts',
    },
    {
      title: 'Generate Reports',
      description: 'Create financial reports',
      link: '/reports',
    },
  ];

  const publicFeatures: Feature[] = [
    {
      title: 'Easy to Use',
      description: 'Intuitive interface designed specifically for NGOs',
    },
    {
      title: 'Secure',
      description: 'Bank-level security for your financial data',
    },
    {
      title: 'Comprehensive',
      description: 'All the tools you need in one place',
    },
  ];

  const features = isAuthenticated ? authenticatedFeatures : publicFeatures;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--color-base)',
      }}
    >
      {isAuthenticated ? <DashboardNavigation /> : <WebsiteHeader />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            bgcolor: 'var(--color-highlight)',
            color: 'var(--color-text-main)',
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
                alignItems: 'center',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h1"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontFamily: 'var(--font-title)',
                    fontWeight: 800,
                    fontSize: { xs: '2rem', md: '3rem' },
                    color: 'var(--color-primary)',
                  }}
                >
                  {isAuthenticated ? 'Welcome to Your Dashboard' : 'Welcome to NGO FMS'}
                </Typography>
                <Typography
                  variant="h5"
                  paragraph
                  sx={{
                    fontFamily: 'var(--font-subtitle)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {isAuthenticated 
                    ? 'Manage your NGO\'s finances with ease'
                    : 'Your trusted partner in NGO financial management'}
                </Typography>
                {!isAuthenticated && (
                  <Button
                    component={RouterLink}
                    to="/signup"
                    variant="contained"
                    size="large"
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
                        color: 'var(--color-primary-contrast)',
                      },
                    }}
                  >
                    Get Started
                  </Button>
                )}
                {isAuthenticated && (
                  <Button
                    component={RouterLink}
                    to="/dashboard"
                    variant="contained"
                    size="large"
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
                        color: 'var(--color-primary-contrast)',
                      },
                    }}
                  >
                    Go to Dashboard
                  </Button>
                )}
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component="img"
                  src="https://source.unsplash.com/random/600x400?charity"
                  alt="NGO Management"
                  sx={{
                    width: '100%',
                    maxWidth: 600,
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-primary)',
              fontWeight: 700,
            }}
          >
            {isAuthenticated ? 'Quick Actions' : 'Why Choose Us?'}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 4,
              mt: 4,
            }}
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                component={feature.link ? RouterLink : 'div'}
                to={feature.link}
                sx={{
                  p: 3,
                  bgcolor: 'var(--color-soft)',
                  borderRadius: 2,
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                  '&:hover': feature.link ? {
                    transform: 'translateY(-4px)',
                    cursor: 'pointer',
                  } : {},
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
      <WebsiteFooter />
    </Box>
  );
}; 