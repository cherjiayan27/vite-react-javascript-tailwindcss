import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../lib/supabaseClient';
import { NavIcons } from '../components/navIcons';

const ProfilePage = ({ onNavigate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session?.user) {
          setUser(session.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // The auth state listener in App.jsx will handle the redirect
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Logout */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            {/* Profile Picture and Name */}
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-full bg-gray-200">
                {user?.user_metadata?.avatar_url && (
                  <img 
                    src={user.user_metadata.avatar_url} 
                    alt="Profile" 
                    className="h-14 w-14 rounded-full object-cover"
                  />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.user_metadata?.full_name || 'User Name'}</h2>
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Profile Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <p className="mt-1 text-gray-900">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

ProfilePage.propTypes = {
  onNavigate: PropTypes.func.isRequired
};

export default ProfilePage; 