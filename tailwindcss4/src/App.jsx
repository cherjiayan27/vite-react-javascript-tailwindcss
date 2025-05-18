import { useState } from 'react';
import PropTypes from 'prop-types';
import LoginPage from './Page/LoginPage';
import LandingPage from './Page/LandingPage';
import HomePage from './Page/HomePage';
import SignupPage from './Page/SignupPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };
  
  const handleAuthSuccess = (status) => {
    setIsAuthenticated(status);
    setShowLogin(false);
    setShowSignup(false);
  };

  if (showSignup) {
    return (
      <SignupPage 
        onSignup={handleAuthSuccess} 
        onSwitchToLogin={handleLogin}
      />
    );
  }

  if (showLogin) {
    return (
      <LoginPage 
        onLogin={handleAuthSuccess} 
        onSwitchToSignup={handleSignup}
      />
    );
  }

  if (isAuthenticated) {
    return <HomePage />;
  }

  // Show landing page by default
  return <LandingPage onLogin={handleLogin} onSignup={handleSignup} />;
};

// PropTypes for child components
LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onSwitchToSignup: PropTypes.func.isRequired
};

SignupPage.propTypes = {
  onSignup: PropTypes.func.isRequired,
  onSwitchToLogin: PropTypes.func.isRequired
};

LandingPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired
};

export default App;