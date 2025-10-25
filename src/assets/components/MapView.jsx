// src/components/MapView.jsx
// MapView: Interactive Kenya map with live OpenAQ air data pins (CO2 proxy via PM2.5).
// Concepts: useEffect (fetches data on component load—runs after render, cleans up on unmount), useState (holds fetched data and loading state), map (loops over data to render Markers), conditional rendering (show loading if no data yet), props (none here, but ready for liveData from App later).

import { useState, useEffect } from 'react'; // useState: Holds data that changes (e.g., API results). useEffect: Runs side effects (e.g., fetch) after render.
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // MapContainer: Leaflet wrapper for the map. TileLayer: Base map tiles. Marker: Pins at lat/lng. Popup: Info box on click.
import 'leaflet/dist/leaflet.css'; // Leaflet: Import styles—without, map's blank.
import axios from 'axios'; // Axios: HTTP client for API calls (easier error handling than fetch).
import L from 'leaflet'; // L: Leaflet core library for custom icons/markers.

// Fix Leaflet default icons in React builds (they don't load without this).
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapView() {
  const [data, setData] = useState([]); // useState: Array for OpenAQ results—starts empty [].
  const [loading, setLoading] = useState(true); // useState: Boolean for loading—starts true to show spinner.

  useEffect(() => {
    const fetchData = async () => { // Async function: Allows await for API call.
      try {
        // OpenAQ endpoint: Live PM2.5 (CO2 proxy) for Nairobi—real Kenyan data, no key needed.
        const response = await axios.get('https://api.openaq.org/v2/latest?city=Nairobi&parameter=pm25&limit=5'); // Await: Waits for response. Limit=5: Small batch for test.
        setData(response.data.results); // Update state with results array—triggers re-render with pins.
      } catch (error) {
        console.error('Fetch error:', error); // Catch: Logs if API fails (e.g., no net).
      } finally {
        setLoading(false); // Finally: Always runs—ends loading, shows map even on error.
      }
    };
    fetchData(); // Call the function—useEffect runs this.
  }, []); // Dependency array []: Empty = run useEffect only once, on component mount (app loads MapView).

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading map data...</div>; // Conditional rendering: Show if loading true—no map yet.
  }

  return (
    <div style={{ height: '400px', width: '100%' }}> {/* Inline style: Fixed height/width for map container—Tailwind later. */}
      <MapContainer center={[-1.2921, 36.8219]} zoom={10} style={{ height: '100%', width: '100%' }}> {/* MapContainer: Leaflet root. Center: Nairobi lat/lng. Zoom=10: City level. Style: Fills div. */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors' // Attribution: Credits map source (required for legal).
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // TileLayer: Free base tiles—{s} = subdomain, {z/x/y} = zoom/tile coords.
        />
        {data.map((item, index) => ( // map: Loops over data array, returns JSX for each item (like forEach but returns elements).
          <Marker key={index} position={[item.coordinates.latitude, item.coordinates.longitude]}> {/* Marker: Pin at data's lat/lng. Key=index: React ID for list (unique for re-renders). */}
            <Popup> {/* Popup: Opens on marker click with info. */}
              <strong>PM2.5 Level:</strong> {item.measurements[0]?.value} µg/m³ <br /> {/* Nested access: measurements[0] first value, ? = safe if missing (no crash). */}
              <strong>Station:</strong> {item.location} <br />
              <strong>Time:</strong> {new Date(item.date.utc).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;