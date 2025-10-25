// src/App.jsx
// App: Main container—holds state (view/user/reports/liveData), fetches, renders views.
// Concepts: useState (changing data like user login), useEffect (auth listener on mount), props (down to children), conditional (login buttons if not logged in), Router (URL nav).

import { useState, useEffect } from 'react'; // useState: Data changes. useEffect: Side effects.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Router: Nav without reload.
import Navbar from './assets/components/Navbar'; // Navbar: Top bar with login toggle.
import MapView from './assets/components/MapView'; // Map: Live pins.
import ReportForm from './assets/components/ReportForm'; // Form: Report input.
import ReportList from './assets/components/ReportList'; // List: Display reports.
import CouncilDashboard from './assets/components/CouncilDashboard'; // Dashboard: Council updates.
import { onAuthChange, signInGoogle, signInGitHub, logout } from './services/firebase'; // Auth: Listener and functions.

function App() {
  const [view, setView] = useState('citizen'); // View state.
  const [reports, setReports] = useState([]); // Reports state.
  const [liveData, setLiveData] = useState([]); // Live data state.
  const [user, setUser] = useState(null); // User state—null if logged out, user object if in.

  // useEffect for auth listener—runs once on mount, updates user state on login/logout.
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => setUser(user)); // Listener: Calls setter with current user (null if out).
    return () => unsubscribe(); // Cleanup: Stops listener on unmount—avoids memory leaks.
  }, []); // Empty deps: Once on load.

  const handleAddReport = (newReport) => {
    setReports(prev => [...prev, { ...newReport, id: Date.now(), status: 'pending', userId: user?.uid || 'guest' }]); // Add with user ID if logged in.
  };

  const handleUpdateStatus = (id, newStatus) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r)); // Update matching ID.
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar currentView={view} onChangeView={setView} user={user} onLogout={logout} onSignInGoogle={signInGoogle} onSignInGitHub={signInGitHub} /> {/* Pass user and functions for conditional buttons. */}
        <main className="p-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={
              <div className="grid md:grid-cols-2 gap-6">
                <MapView data={liveData} />
                <div className="space-y-4">
                  <ReportForm onAddReport={handleAddReport} />
                  <ReportList reports={reports} />
                </div>
              </div>
            } />
            <Route path="/council" element={
              <CouncilDashboard reports={reports} onUpdateStatus={handleUpdateStatus} />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;