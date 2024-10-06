import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Paper } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import MapView from './components/MapView';
import DataComparison from './components/DataComparison';
import Education from './components/Education';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#eaeff1',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 20px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
          <Header />
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              backgroundColor: '#ffffff',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              mx: 4,
              my: 2,
              overflow: 'hidden',
            }}
          >
            <Container maxWidth="lg">
              <Paper elevation={3} sx={{ p: 4, borderRadius: '12px', backgroundColor: '#ffffff' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/map" element={<MapView />} />
                  <Route path="/compare" element={<DataComparison />} />
                  <Route path="/learn" element={<Education />} />
                </Routes>
              </Paper>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
