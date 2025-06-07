import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { WebsiteHeader } from '../components/WebsiteHeader';
import { WebsiteFooter } from '../components/WebsiteFooter';

export const AboutPage = () => {
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
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontFamily: 'var(--font-title)',
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                color: 'var(--color-primary)',
                textAlign: 'center',
              }}
            >
              About NGO FMS
            </Typography>
            <Typography
              variant="h5"
              paragraph
              sx={{
                fontFamily: 'var(--font-subtitle)',
                color: 'var(--color-accent)',
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Empowering NGOs with innovative financial management solutions since 2024
            </Typography>
          </Container>
        </Box>

        {/* Mission Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'var(--color-soft)',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                  }}
                >
                  Our Mission
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-main)',
                    fontSize: '1.1rem',
                  }}
                >
                  At NGO FMS, we are dedicated to empowering non-profit organizations with cutting-edge financial management tools. Our mission is to simplify financial operations, enhance transparency, and enable NGOs to focus on their core mission of creating positive change in the world.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'var(--color-soft)',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                  }}
                >
                  Our Vision
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-main)',
                    fontSize: '1.1rem',
                  }}
                >
                  We envision a world where every NGO has access to professional-grade financial management tools, enabling them to operate with maximum efficiency and impact. By streamlining financial processes, we help organizations focus on what matters most - making a difference in their communities.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Values Section */}
        <Box sx={{ bgcolor: 'var(--color-highlight)', py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                fontFamily: 'var(--font-section-header)',
                color: 'var(--color-secondary)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                mb: 6,
              }}
            >
              Our Core Values
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: 'Transparency',
                  description: 'We believe in complete transparency in all financial operations and reporting.',
                },
                {
                  title: 'Innovation',
                  description: 'Continuously improving our platform with cutting-edge technology and features.',
                },
                {
                  title: 'Reliability',
                  description: 'Providing dependable and secure financial management solutions you can trust.',
                },
                {
                  title: 'Support',
                  description: 'Dedicated support team to help you make the most of our platform.',
                },
              ].map((value, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      bgcolor: 'var(--color-soft)',
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-primary)',
                        fontWeight: 700,
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--color-text-main)',
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Team Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontFamily: 'var(--font-section-header)',
              color: 'var(--color-secondary)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              mb: 6,
            }}
          >
            Our Team
          </Typography>
          <Typography
            paragraph
            align="center"
            sx={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-main)',
              fontSize: '1.1rem',
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
            }}
          >
            Our team consists of experienced professionals from the non-profit and technology sectors, working together to create the best financial management solution for NGOs.
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO & Founder',
                description: '15+ years of experience in non-profit management and financial technology.',
              },
              {
                name: 'Michael Chen',
                role: 'CTO',
                description: 'Expert in financial software development and system architecture.',
              },
              {
                name: 'Emily Rodriguez',
                role: 'Head of Customer Success',
                description: 'Dedicated to ensuring NGOs get the most value from our platform.',
              },
            ].map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    bgcolor: 'var(--color-soft)',
                    borderRadius: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary)',
                      fontWeight: 700,
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontFamily: 'var(--font-subheading)',
                      color: 'var(--color-secondary)',
                      mb: 2,
                    }}
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text-main)',
                    }}
                  >
                    {member.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <WebsiteFooter />
    </Box>
  );
}; 