// src/components/CouncilDashboard.jsx
// CouncilDashboard: Council-specific view—lists reports with buttons to update status (pending → resolved).
// Concepts: Props (receives reports array and onUpdateStatus function from App), map (loops reports for <li>), onClick (button clicks call prop to update state), conditional rendering (empty message if no reports), key (unique ID for list re-renders).

import React from 'react'; // React: Core for components—no hooks (pure display + events).

function CouncilDashboard({ reports, onUpdateStatus }) { // Props: reports (array from App state), onUpdateStatus (function from App to update report status).
  return (
    <div style={{ border: '1px solid darkgray', padding: '15px', borderRadius: '4px', background: '#f9f9f9' }}> {/* Inline style: Darker border for authority feel, padding for space, light bg for dashboard look. */}
      <h2 style={{ color: 'darkgreen', marginBottom: '15px', fontSize: '1.5rem' }}>Council Dashboard</h2> 
      {reports.length === 0 ? ( // Conditional rendering: If reports array empty, show message.
        <p style={{ color: 'gray', fontStyle: 'italic', textAlign: 'center' }}>No incoming reports. Monitor for new submissions.</p> // Italic gray centered: Subtle empty state—professional nudge for councils.
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}> {/* Unstyled list: No bullets/pad/margin—clean, professional cards. */}
          {reports.map((report) => ( // map: Loops over reports, returns <li> for each—dynamic based on array length.
            <li key={report.id} style={{ marginBottom: '20px', padding: '12px', border: '1px solid lightgray', borderRadius: '6px', background: 'white' }}> {/* li: List item. key=report.id: React ID for efficient updates (e.g., status change re-renders only this li). Style: Margin for space, padding/border/rounded/white bg for card look. */}
              <strong style={{ color: 'darkgreen' }}>{report.title}</strong> {/* Title: Bold dark green—highlights the issue. */}
              <p style={{ margin: '8px 0', color: 'black', lineHeight: '1.4' }}>{report.description}</p> {/* Description: Paragraph with margins/line-height for readability—full details. */}
              <div style={{ marginTop: '10px', fontSize: '0.9rem', color: 'gray' }}> {/* Div for details row. */}
                Status: <span style={{ fontWeight: 'bold', color: report.status === 'pending' ? 'orange' : 'green' }}>{report.status}</span> | {/* Conditional color: Orange for pending, green for resolved—visual status cue. */}
                Reported: {new Date(report.timestamp).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} {/* toLocaleString with options: Formatted date/time (e.g., "Oct 25, 2025, 10:30 AM")—readable, not raw. */}
              </div>
              <button
                onClick={() => onUpdateStatus(report.id, report.status === 'pending' ? 'resolved' : 'pending')} // onClick: Calls prop with ID and toggled status (pending → resolved, vice versa). Conditional: Toggle based on current.
                style={{ 
                  marginTop: '8px', 
                  padding: '6px 12px', 
                  background: report.status === 'pending' ? 'green' : 'gray', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
                }} // Style: Top margin for space, padding for size, green if pending (action needed), gray if resolved (inactive). Cursor: Pointer on hover.
              >
                {report.status === 'pending' ? 'Mark Resolved' : 'Reopen'} {/* Conditional text: Changes button label based on status—intuitive. */}
              </button> {/* Button: Triggers update—state changes in App, re-renders list with new status. */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CouncilDashboard; // Export: Makes CouncilDashboard importable in App.jsx.