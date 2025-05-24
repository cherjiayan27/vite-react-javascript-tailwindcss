import React from 'react';
import PropTypes from 'prop-types';
import WowLogo from '../components/wowLogo';
import { NavIcons } from '../components/navIcons';

const HomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex justify-center pt-72">
        <WowLogo />
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <NavIcons onNavigate={onNavigate} />
        </div>
      </nav>
    </div>
  );
};

HomePage.propTypes = {
  onNavigate: PropTypes.func.isRequired
};

export default HomePage; 