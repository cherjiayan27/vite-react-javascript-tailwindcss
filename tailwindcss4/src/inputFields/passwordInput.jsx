import React from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({ 
  value, 
  onChange, 
  disabled 
}) => (
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
      Password
    </label>
    <input
      id="password"
      type="password"
      required
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
      value={value}
      onChange={onChange}
      placeholder="Enter your password"
      disabled={disabled}
    />
  </div>
);

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export { PasswordInput }; 