import React from 'react';
import { Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import CompareIcon from '@mui/icons-material/Compare';
import SchoolIcon from '@mui/icons-material/School';

function Home() {
  const features = [
    {
      title: 'Interactive Map',
      description: 'Explore Landsat data on our interactive map. Set locations and receive notifications for upcoming satellite passes.',
      icon: <MapIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      link: '/map',
    },
    {
      title: 'Data Comparison',
      description: 'Compare Landsat surface reflectance data with your ground-based measurements using our intuitive tools.',
      icon: <CompareIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      link: '/compare',
    },
    {
      title: 'Educational Resources',
      description: 'Learn about Landsat, spectral reflectance, and the importance of Earth observation data.',
      icon: <SchoolIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      link: '/learn',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Landsat Spectral Comparison
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" paragraph>
          Explore, compare, and learn about Landsat data and spectral measurements
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {feature.description}
                </Typography>
                <Button component={Link} to={feature.link} variant="contained" color="primary">
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;