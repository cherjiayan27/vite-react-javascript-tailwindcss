import React, { useState } from 'react';
import WowLogo from '../components/wowLogo';
import { PrimaryButton } from '../components/buttons';
import { EmailInput } from '../inputFields/emailInput';
import { PasswordInput } from '../inputFields/passwordInput';

const SignupPage = ({ onSignup, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      setEmailError('Email must contain @');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      return;
    }
    
    setIsLoading(true);

    try {
      if (email && password) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        onSignup(true);
      } else {
        throw new Error('Please enter both email and password');
      }
    } catch (err) {
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="absolute top-2 left-2 p-4">
        <WowLogo width="w-16" height="h-16" />
      </div>
      
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="text-left mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Get started
            </h1>
            <p className="text-lg text-gray-600">
              Create a new account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p className="font-medium">Oops!</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <EmailInput
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              disabled={isLoading}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <div>
              <PrimaryButton
                onClick={handleSubmit}
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing up...
                  </span>
                ) : (
                  'Sign Up'
                )}
              </PrimaryButton>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSwitchToLogin();
              }}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 