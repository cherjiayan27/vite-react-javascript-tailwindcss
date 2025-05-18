import React from 'react';
import PropTypes from 'prop-types';

const EmailInput = ({ 
  value, 
  onChange, 
  error, 
  disabled 
}) => (
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
      Email Address
    </label>
    <input
      id="email"
      type="text"
      required
      className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
      value={value}
      onChange={onChange}
      placeholder="Enter your email"
      disabled={disabled}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
);

EmailInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool
};

export { EmailInput };

