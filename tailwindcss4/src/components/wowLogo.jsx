import React from 'react';
import filteredWisdom from '../assets/filteredWisdom.png';

const WowLogo = ({ width = "w-50", height = "h-48" }) => {
  return (
    <div className="flex flex-col items-center">
      <img 
        src={filteredWisdom} 
        alt="WOW Logo" 
        className={`${width} ${height} object-contain drop-shadow-lg`}
      />
    </div>
  );
};

export default WowLogo; 