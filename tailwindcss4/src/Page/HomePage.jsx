import React from 'react';
import WowLogo from '../components/wowLogo';
import { NavIcons } from '../components/navIcons';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex justify-center pt-72">
        <WowLogo />
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <NavIcons />
        </div>
      </nav>
    </div>
  );
};

export default HomePage; 