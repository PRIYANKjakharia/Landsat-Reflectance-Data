import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, Button, TextField, Paper, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function DataComparison() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [landsatData, setLandsatData] = useState([]);
  const [groundData, setGroundData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/locations');
      setLocations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLoading(false);
    }
  };

  const fetchLandsatData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/landsat/scenes`, {
        params: {
          locationId: selectedLocation,
        }
      });
      setLandsatData(response.data);
    } catch (error) {
      console.error('Error fetching Landsat data:', error);
    }
  };

  const handleAddGroundData = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newGroundData = {
      date: formData.get('date'),
      surfaceReflectance: parseFloat(formData.get('value')),
    };
    setGroundData([...groundData, newGroundData]);
  };

  const chartData = [
    ...landsatData.map(data => ({
      name: new Date(data.acquisitionDate).toLocaleDateString(),
      Landsat: data.surfaceReflectance,
    })),
    ...groundData.map(data => ({
      name: new Date(data.date).toLocaleDateString(),
      Ground: data.surfaceReflectance,
    })),
  ].sort((a, b) => new Date(a.name) - new Date(b.name));

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Data Comparison</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            displayEmpty
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="" disabled>Select a location</MenuItem>
            {locations.map((location) => (
              <MenuItem key={location._id} value={location._id}>
                {`${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}`}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={fetchLandsatData} disabled={!selectedLocation}>
            Fetch Landsat Data
          </Button>
        </Box>
        <form onSubmit={handleAddGroundData}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
            <TextField
              name="date"
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              name="value"
              type="number"
              label="Reflectance Value"
              InputLabelProps={{ shrink: true }}
              required
            />
            <Button type="submit" variant="contained">Add Measurement</Button>
          </Box>
        </form>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Landsat" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Ground" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default DataComparison;