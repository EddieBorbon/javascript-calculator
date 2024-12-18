import React, { useState, useEffect } from 'react';
import Calculator from './Calculator'; // Import the Calculator component
import './App.css'; // Import global styles

function App() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  // Hide the welcome screen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeScreen(false);
    }, 3000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {/* Welcome Screen */}
      {showWelcomeScreen ? (
        <div className="welcome-screen">
          <h1 className="neon-welcome">Javascript Calculator</h1>
          <h2 className="neon-subtitle">Developed by Eddie Jonathan Garcia Borbon</h2>
        </div>
      ) : (
        // Calculator Component
        <Calculator />
      )}
    </div>
  );
}

export default App;