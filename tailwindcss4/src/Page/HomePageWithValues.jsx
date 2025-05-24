import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WowLogo from '../components/wowLogo';
import { NavIcons } from '../components/navIcons';
import { supabase } from '../lib/supabaseClient';

const HomePageWithValues = ({ onNavigate }) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user found');

        const { data, error } = await supabase
          .from('Quotes')
          .select(`
            id,
            quote,
            created_at
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setQuotes(data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex justify-center pt-20 mb-8">
        <WowLogo width="w-32" height="h-32" />
      </div>

      {/* Quotes List */}
      <div className="max-w-2xl mx-auto px-4 pb-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Quotes</h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-gray-900 border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>You haven't created any quotes yet.</p>
            <button
              onClick={() => onNavigate('create')}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Create your first quote
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white rounded-lg shadow p-6"
              >
                <p className="text-gray-900 text-lg mb-4">{quote.quote}</p>
                <div className="text-sm text-gray-500 text-right">
                  {new Date(quote.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
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

HomePageWithValues.propTypes = {
  onNavigate: PropTypes.func.isRequired
};

export default HomePageWithValues; 