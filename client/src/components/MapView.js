import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// CORS proxy URL
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

function MapView() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [landsatScenes, setLandsatScenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${CORS_PROXY}http://localhost:5000/api/locations`);
      setMarkers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLoading(false);
    }
  };

  const handleMapClick = async (e) => {
    const newMarker = {
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    };

    try {
      const response = await axios.post(`${CORS_PROXY}http://localhost:5000/api/locations`, newMarker);
      setMarkers([...markers, response.data]);
      setSelectedMarker(response.data);
      fetchLandsatData(response.data);
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  const fetchLandsatData = async (marker) => {
    try {
      const response = await axios.get(`${CORS_PROXY}http://localhost:5000/api/landsat/future-scenes`, {
        params: {
          latitude: marker.latitude,
          longitude: marker.longitude,
        }
      });
      setLandsatScenes(response.data);
    } catch (error) {
      console.error('Error fetching Landsat data:', error);
    }
  };

  function MapEventHandler() {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  }

  function SearchControl() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'bar',
        showMarker: false,
        showPopup: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: false,
        searchLabel: 'Search for a location'
      });
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, [map]);
    return null;
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 'calc(100vh - 100px)' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12} md={8}>
          <MapContainer 
            center={[20.5937, 78.9629]} 
            zoom={5} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEventHandler />
            <SearchControl />
            {markers.map((marker) => (
              <Marker
                key={marker._id}
                position={[marker.latitude, marker.longitude]}
                eventHandlers={{
                  click: () => {
                    setSelectedMarker(marker);
                    fetchLandsatData(marker);
                  },
                }}
              >
                <Popup>
                  <Typography>Lat: {marker.latitude.toFixed(4)}</Typography>
                  <Typography>Lon: {marker.longitude.toFixed(4)}</Typography>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', overflowY: 'auto' }}>
            <CardContent>
              {selectedMarker ? (
                <>
                  <Typography variant="h6" gutterBottom>Selected Location</Typography>
                  <Typography>Latitude: {selectedMarker.latitude.toFixed(4)}</Typography>
                  <Typography>Longitude: {selectedMarker.longitude.toFixed(4)}</Typography>
                  {landsatScenes.length > 0 ? (
                    <>
                      <Typography variant="h6" gutterBottom>Future Landsat Scenes</Typography>
                      {landsatScenes.map((scene, index) => (
                        <Typography key={index}>
                          Date: {new Date(scene.acquisitionDate).toLocaleDateString()}
                        </Typography>
                      ))}
                    </>
                  ) : (
                    <Typography>No future Landsat scenes available for this location.</Typography>
                  )}
                </>
              ) : (
                <Typography>Click on the map to select a location.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MapView;