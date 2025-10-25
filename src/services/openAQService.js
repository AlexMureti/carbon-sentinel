// src/services/openAQService.js
// openAQService: Helper functions for fetching live air quality data from OpenAQ API (CO2 proxy via PM2.5/NO2).
// Concepts: Async functions (await for API calls), error handling (try/catch to log failures without crashing app), export (makes functions importable in MapView/App).

import axios from 'axios'; // Axios: HTTP client—easier for API calls than fetch (built-in JSON parse, error handling).

const BASE_URL = 'https://api.openaq.org/v2'; // Base URL: OpenAQ's endpoint—free, no key, real Kenyan stations.

// Function to fetch live data for a city (e.g., 'Nairobi'—returns PM2.5 as CO2 proxy).
export const getLiveData = async (city = 'Nairobi', parameter = 'pm25', limit = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/latest`, { // Await: Waits for response.
      params: { // Params: Query string—city=Nairobi, parameter=pm25 (pollutant proxy for CO2), limit=10 (small batch).
        city,
        parameter,
        limit,
      },
    });
    return response.data.results; // Return results array (lat/lng, value, location)—MapView uses for pins.
  } catch (error) {
    console.error('OpenAQ fetch error:', error.response?.status || error.message); // Catch: Logs status (e.g., 404) or message.
    return []; // Graceful fail: Return empty array—no crash, MapView shows "no data."
  }
};

// Function to fetch by coordinates (for specific hotspot queries—future use).
export const getDataByCoords = async (lat, lng, parameter = 'pm25', limit = 5) => {
  try {
    const response = await axios.get(`${BASE_URL}/measurements`, {
      params: {
        coordinates: `${lat},${lng}`,
        radius: 10000, // Radius: 10km around coords.
        parameter,
        limit,
      },
    });
    return response.data.results; // Return measurements array.
  } catch (error) {
    console.error('Coords fetch error:', error);
    return [];
  }
};