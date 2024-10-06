import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

function Education() {
  const resources = [
    {
      title: 'Introduction to Landsat',
      content: 'Learn about the Landsat program and its importance in Earth observation.',
      image: 'https://imgs.search.brave.com/iW2bUmf_0kw7vPtOdqO2p6M2yqDSFpTlBroe8bY38Q8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYW5k/c2F0LmdzZmMubmFz/YS5nb3Yvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMTEvTGFu/ZHNhdDlfdW5kZXJf/YnctNzY4eDQzMi5w/bmc',
    },
    {
      title: 'Understanding Spectral Reflectance',
      content: 'Explore the basics of spectral reflectance and how its measured.',
      image: 'https://imgs.search.brave.com/iW2bUmf_0kw7vPtOdqO2p6M2yqDSFpTlBroe8bY38Q8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYW5k/c2F0LmdzZmMubmFz/YS5nb3Yvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMTEvTGFu/ZHNhdDlfdW5kZXJf/YnctNzY4eDQzMi5w/bmc',
    },
    {
      title: 'Landsat Data Applications',
      content: 'Discover various applications of Landsat data in environmental monitoring and research.',
      image: 'https://imgs.search.brave.com/iW2bUmf_0kw7vPtOdqO2p6M2yqDSFpTlBroe8bY38Q8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYW5k/c2F0LmdzZmMubmFz/YS5nb3Yvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMTEvTGFu/ZHNhdDlfdW5kZXJf/YnctNzY4eDQzMi5w/bmc',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Educational Resources</Typography>
      <Grid container spacing={3}>
        {resources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={resource.image}
                alt={resource.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {resource.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {resource.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Education;