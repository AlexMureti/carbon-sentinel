
// Concepts: useState (changing data), useEffect (after-render actions), props (down flow), conditional (if/else in JSX), Router (URL nav).

import { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/components/Navbar';
import MapView from './assets/components/MapView';
import ReportForm from './assets/components/ReportForm';
import ReportList from './assets/components/ReportList';
import CouncilDashboard from './assets/components/CouncilDashboard';

function App() {
  const [view, setView] = useState('citizen'); // View toggle.
  const [reports, setReports] = useState([ // Dummy for test—remove later.
    { id: 1, title: 'Test Dump', description: 'Heavy smoke', status: 'pending', timestamp: new Date().toISOString() }
  ]); // Reports state.
  const [liveData, setLiveData] = useState([]); // Live data state.

  useEffect(() => {
    console.log('App loaded'); // Stub—OpenAQ fetch here later.
  }, []); // Once on load.

  const handleAddReport = (newReport) => {
    setReports(prev => [...prev, { ...newReport, id: Date.now(), status: 'pending' }]); // Add to list.
  };

  const handleUpdateStatus = (id, newStatus) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r)); // Update one.
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar currentView={view} onChangeView={setView} />
        <main className="p-4">
          <Routes>
            <Route path="/" element={
              <div className="grid md:grid-cols-2 gap-4">
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