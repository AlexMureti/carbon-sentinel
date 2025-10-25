// src/components/ReportList.jsx
// ReportList: Displays a list of submitted reports (from App state).
// Concepts: Props (receives reports array from parent App), map (loops over array to render each report as a list item), conditional rendering (show message if empty array), key (unique ID for React to track items in lists—prevents bugs on re-renders).

import React from 'react'; // React: Core for components—no hooks needed here (pure display).

function ReportList({ reports }) { // Props: reports (array from App state—e.g., [{id, title, description, status, ...}]).
  return (
    <div style={{ border: '1px solid gray', padding: '10px', borderRadius: '4px' }}> {/* Inline style: Bordered box with rounded corners for visual separation. */}
      <h2 style={{ color: 'green', marginBottom: '10px' }}>Recent Reports</h2> {/* Title: Green color for eco theme, margin for spacing. */}
      {reports.length === 0 ? ( // Conditional rendering: If reports array length is 0, show empty message.
        <p style={{ color: 'gray', fontStyle: 'italic' }}>No reports yet. Be the first to submit one!</p> // Italic gray text for empty state—user-friendly nudge.
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}> {/* Unstyled list: No bullets, no padding/margin for clean look. */}
          {reports.map((report) => ( // map: Loops over reports array, returns JSX for each object (like forEach but builds elements).
            <li key={report.id} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid lightgray' }}> {/* li: List item. key=report.id: React's unique ID for efficient re-renders/updates. Style: Bottom margin/padding, light border for separation. */}
              <strong style={{ color: 'green' }}>{report.title}</strong> {/* Title: Bold green for emphasis. */}
              <p style={{ margin: '5px 0', color: 'black' }}>{report.description}</p> {/* Description: Paragraph with margins, black text for readability. */}
              <small style={{ color: 'gray' }}>Status: {report.status} | {new Date(report.timestamp).toLocaleString()}</small> {/* small: Subtle text for status/timestamp. toLocaleString: Converts ISO date to readable format (e.g., "10/25/2025, 10:30 AM"). */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReportList;