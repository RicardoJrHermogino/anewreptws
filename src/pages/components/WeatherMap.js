// src/components/WeatherMap.js
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Grid, Typography } from '@mui/material';

// Your actual Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicmljYXJkb2pyIiwiYSI6ImNtMWY5NTkzZTM2d2kya3Njenl5MzM3c2oifQ.XNjWBeaNLSTU4jufBC3VLw';

const WeatherMap = () => {
  useEffect(() => {
    // Set the Mapbox access token
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const mapContainer = document.getElementById('weather-map');

    // Latitude and Longitude for the center of Sorsogon Province
    const lat = 12.9289; // Approximate center latitude
    const lon = 124.0955; // Approximate center longitude

    // Create the map
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [lon, lat],
      zoom: 9 // Adjusted zoom level for a broader view
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Optionally add a marker for Sorsogon Province center
    new mapboxgl.Marker()
      .setLngLat([lon, lat])
      .setPopup(new mapboxgl.Popup().setText('Sorsogon Province'))
      .addTo(map);

    return () => {
      map.remove(); // Cleanup on component unmount
    };
  }, []);

  return (
    <>
    <Grid alignItems={'center'}>
        <Typography>Weather Map</Typography>
        <Grid id="weather-map" style={{ height: '250px', width: '100%' }}></Grid>
    </Grid>
        
    </>
  );
};

export default WeatherMap;
