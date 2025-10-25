// src/components/ReportForm.jsx
// ReportForm: User form for submitting new carbon hotspot reports (title, description, lat/lng).
// Concepts: useState for controlled inputs (form fields tied to state—value/onChange pair), onSubmit (handles form send, prevents reload), validation (check empty fields before log/POST), props (onAddReport function from App for state update).

import { useState } from 'react'; // useState: Creates state for form fields—each input has its own (title, description, etc.).

function ReportForm({ onAddReport }) { // Props: onAddReport (function from App to add to global reports state).
  // useState for each field: String state, starts empty. onChange updates it on type.
  const [title, setTitle] = useState(''); // Title field state.
  const [description, setDescription] = useState(''); // Description field state.
  const [lat, setLat] = useState(''); // Lat field state (string for input, parseFloat later).
  const [lng, setLng] = useState(''); // Lng field state.

  // onSubmit handler: Runs on form submit.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default: Stops page reload on submit (form behavior).

    // Validation: Check if required fields empty (trim removes spaces).
    if (!title.trim() || !description.trim()) {
      alert('Title and description required.'); // Basic alert—user feedback.
      return; // Exit early if invalid.
    }

    // Create report object from state—add defaults.
    const newReport = {
      title: title.trim(), // Trim: Clean spaces.
      description: description.trim(),
      lat: parseFloat(lat) || null, // ParseFloat: Convert string to number; null if empty.
      lng: parseFloat(lng) || null,
      status: 'pending', // Default status.
      timestamp: new Date().toISOString(), // ISO timestamp for sorting.
    };

    // Call prop function to add to App state (optimistic—UI updates immediately).
    onAddReport(newReport); // Props flow: Sends data up to parent.

    // Reset form: Set states to empty—clears inputs.
    setTitle('');
    setDescription('');
    setLat('');
    setLng('');

    console.log('Report submitted:', newReport); // Log for test/debug—see in console.
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}> {/* Inline style: Vertical flex stack with 10px gaps. */}
      <h2 style={{ color: 'green' }}>Report a Hotspot</h2> 
      <input
        type="text"
        placeholder="Title (e.g., Waste Burn in Kibera)"
        value={title} // Controlled input: Value from state—empty if state empty.
        onChange={(e) => setTitle(e.target.value)} // onChange: Updates state on every keystroke—re-renders input.
        style={{ padding: '8px', border: '1px solid gray', borderRadius: '4px' }} // Basic style: Padding, border, rounded.
      />
      <textarea
        placeholder="Description (what you see, why it's bad)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '8px', border: '1px solid gray', borderRadius: '4px', height: '80px' }} // Textarea: Multi-line, fixed height.
      />
      <input
        type="number"
        placeholder="Latitude (e.g., -1.2921)"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        style={{ padding: '8px', border: '1px solid gray', borderRadius: '4px' }}
      />
      <input
        type="number"
        placeholder="Longitude (add example 36.8219)"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        style={{ padding: '8px', border: '1px solid gray', borderRadius: '4px' }}
      />
      <button type="submit" style={{ padding: '8px', background: 'green', color: 'white', border: 'none', borderRadius: '4px' }}>Submit</button> {/* type="submit": Triggers onSubmit. Style: Green button. */}
    </form>
  );
}

export default ReportForm;