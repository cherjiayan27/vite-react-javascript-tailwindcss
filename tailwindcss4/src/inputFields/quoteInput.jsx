import React from 'react';
import PropTypes from 'prop-types';

const QuoteInput = ({ 
  value, 
  onChange, 
  error,
  disabled,
  label = "Quote",
  placeholder = ""
}) => (
  <div>
    <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      id="quote"
      required
      className={`w-full px-6 py-5 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 min-h-[120px] resize-none`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
);

QuoteInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string
};

export { QuoteInput }; 