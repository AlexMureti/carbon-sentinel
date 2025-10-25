// src/components/ReportForm.jsx
// ReportForm: User form for submitting new carbon hotspot reports.
// Concepts: useState for controlled inputs (value/onChange pair), onSubmit for handling (prevent reload, validation), navigator.geolocation (browser API for auto GPS—runs in promise, no manual lat/lng), props (onAddReport from App for state update).

import { useState } from 'react'; // useState: For form fields—each input tied to state.

function ReportForm({ onAddReport }) { // Props: onAddReport (function from App to add to global reports).
  const [title, setTitle] = useState(''); // Title state.
  const [description, setDescription] = useState(''); // Description state.
  const [lat, setLat] = useState(''); // Lat state—auto-filled by GPS.
  const [lng, setLng] = useState(''); // Lng state.
  const [loadingGPS, setLoadingGPS] = useState(false); // Loading state for GPS—shows spinner.

  // Get GPS function—runs on button click.
  const getLocation = () => {
    setLoadingGPS(true); // Set loading—UI feedback.
    navigator.geolocation.getCurrentPosition( // Browser API: Gets coords—success/error callbacks.
      (position) => { // Success: Position object with coords.
        setLat(position.coords.latitude.toString()); // Update lat state.
        setLng(position.coords.longitude.toString()); // Update lng state.
        setLoadingGPS(false); // End loading.
      },
      (error) => { // Error: User denied or no GPS.
        console.error('GPS error:', error); // Log for debug.
        alert('GPS denied—enter manual lat/lng or try again.'); // User feedback.
        setLoadingGPS(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 } // Options: High accuracy, 10s timeout, cache 1 min.
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop reload.
    if (!title.trim() || !description.trim()) {
      alert('Title and description required.');
      return;
    }

    const newReport = {
      title: title.trim(),
      description: description.trim(),
      lat: parseFloat(lat) || null, // Parse to number; null if empty.
      lng: parseFloat(lng) || null,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };

    onAddReport(newReport); // Call prop—updates App state/map.
    alert('Report submitted!'); // Feedback.
    // Reset.
    setTitle('');
    setDescription('');
    setLat('');
    setLng('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}> {/* Form: onSubmit triggers handler. Style: Vertical stack. */}
      <h2 style={{ color: 'green' }}>Report a Hotspot</h2>
      <input
        type="text"
        placeholder="Title (e.g., Waste Burn)"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Updates state on type—controlled input.
        style={{ padding: '8px', border: '1px solid gray', borderRadius: '4px' }}
      />
      <textarea
        placeholder="Description (what you see)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '8px', border: '1px solid gray', borderRadius: '4px', height: '80px' }}
      />
      <div style={{ display: 'flex', gap: '10px' }}> {/* Div: Horizontal for buttons. */}
        <button
          type="button" // type="button": No submit—runs getLocation.
          onClick={getLocation}
          disabled={loadingGPS} // Disabled if loading—prevents double-click.
          style={{ padding: '8px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          {loadingGPS ? 'Getting Location...' : 'Use My Location'} {/* Conditional text: Spinner if loading. */}
        </button>
        <input
          type="number"
          placeholder="Latitude (auto-filled)"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          style={{ padding: '8px', border: '1px solid gray', borderRadius: '4px', flex: 1 }}
        />
        <input
          type="number"
          placeholder="Longitude (auto-filled)"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          style={{ padding: '8px', border: '1px solid gray', borderRadius: '4px', flex: 1 }}
        />
      </div>
      <button type="submit" style={{ padding: '8px', background: 'green', color: 'white', border: 'none', borderRadius: '4px' }}>
        Submit Report
      </button>
    </form>
  );
}

export default ReportForm;