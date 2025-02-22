import React, { useState } from 'react';
import { Moon, Sun, Youtube, FileText, History, Lightbulb, LogIn } from 'lucide-react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = (licenseKey: string) => {
    // TODO: Implement actual license key validation
    if (licenseKey.length > 0) {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} darkMode={darkMode} />
      ) : (
        <>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Dashboard darkMode={darkMode} />
        </>
      )}
    </div>
  );
}

export default App;