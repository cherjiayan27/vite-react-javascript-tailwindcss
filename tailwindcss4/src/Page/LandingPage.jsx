import React from 'react';
import WowLogo from '../components/wowLogo';
import { PrimaryButton, TextButton } from '../components/buttons';

const LandingPage = ({ onLogin, onSignup }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="mb-8">
        <WowLogo />
      </div>
      <div className="w-full max-w-md px-8">
        <PrimaryButton onClick={onLogin} className="w-full mb-4">
          Login
        </PrimaryButton>
        <TextButton onClick={onSignup} className="w-full text-center">
          Signup
        </TextButton>
      </div>
    </div>
  );
};

export default LandingPage; 