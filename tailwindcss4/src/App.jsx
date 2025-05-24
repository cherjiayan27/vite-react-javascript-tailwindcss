import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { supabase } from './lib/supabaseClient';
import LoginPage from './Page/LoginPage';
import LandingPage from './Page/LandingPage';
import HomePage from './Page/HomePage';
import HomePageWithValues from './Page/HomePageWithValues';
import SignupPage from './Page/SignupPage';
import ProfilePage from './Page/ProfilePage';
import CreateQuotePage from './Page/CreateQuotePage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [hasQuotes, setHasQuotes] = useState(false);

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session) {
        checkUserQuotes();
      }
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        checkUserQuotes();
      } else {
        setHasQuotes(false);
      }
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  const checkUserQuotes = async () => {
    try {
      const { data: quotes, error } = await supabase
        .from('Quotes')
        .select('id')
        .limit(1);

      if (error) throw error;
      setHasQuotes(quotes && quotes.length > 0);
    } catch (error) {
      console.error('Error checking quotes:', error);
      setHasQuotes(false);
    }
  };

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

  const handleNavigate = (page) => {
    setCurrentPage(page);
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
    switch (currentPage) {
      case 'home':
        return hasQuotes ? (
          <HomePageWithValues onNavigate={handleNavigate} />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'create':
        return <CreateQuotePage onNavigate={handleNavigate} />;
      default:
        return hasQuotes ? (
          <HomePageWithValues onNavigate={handleNavigate} />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
    }
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

HomePage.propTypes = {
  onNavigate: PropTypes.func.isRequired
};

HomePageWithValues.propTypes = {
  onNavigate: PropTypes.func.isRequired
};

ProfilePage.propTypes = {
  onNavigate: PropTypes.func.isRequired
};

CreateQuotePage.propTypes = {
  onNavigate: PropTypes.func.isRequired
};

export default App;