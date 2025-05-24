import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { QuoteInput } from '../inputFields/quoteInput';
import { PrimaryButton } from '../components/buttons';
import WowLogo from '../components/wowLogo';
import { supabase } from '../lib/supabaseClient';

const CreateQuotePage = ({ onNavigate }) => {
  const [quote, setQuote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getCurrentUser();
  }, []);

  const handleQuoteChange = (e) => {
    setQuote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error: insertError } = await supabase
        .from('Quotes')
        .insert([
          {
            user_id: user.id,
            quote: quote.trim(),
            created_at: new Date().toISOString()
          }
        ]);

      if (insertError) throw insertError;

      onNavigate('home');
    } catch (error) {
      console.error('Failed to submit quote:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Back Button */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="h-6 w-6 mr-2" />
              <span className="text-lg">Back</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-20 mb-8">
        <WowLogo width="w-32" height="h-32" />
      </div>
      
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Quote</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <QuoteInput
            value={quote}
            onChange={handleQuoteChange}
            label="Quote"
            error={error}
          />
          <div className="pt-4">
            <PrimaryButton
              type="submit"
              disabled={isSubmitting || !quote.trim()}
              className="w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Quote'
              )}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateQuotePage.propTypes = {
  onNavigate: PropTypes.func.isRequired
};

export default CreateQuotePage;
