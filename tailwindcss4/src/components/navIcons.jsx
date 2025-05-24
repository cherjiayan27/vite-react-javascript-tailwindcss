import React from 'react';
import {
  HomeIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const iconStyle = "h-7 w-7";
const plusIconStyle = "h-8 w-8";

const NavIcons = ({ onNavigate }) => {
  return (
    <div className="flex w-full items-end px-11">
      <div 
        className="flex flex-col items-center cursor-pointer hover:opacity-75"
        onClick={() => onNavigate('home')}
      >
        <HomeIcon className={iconStyle} />
        <span className="text-sm mt-1">Home</span>
      </div>
      <div 
        className="absolute -top-8 left-1/2 -translate-x-1/2"
        onClick={() => onNavigate('create')}
      >
        <div className="bg-gray-700 rounded-full p-6 shadow-lg cursor-pointer hover:bg-gray-800">
          <PlusIcon className={`${plusIconStyle} text-white`} />
        </div>
      </div>
      <div 
        className="flex flex-col items-center ml-auto cursor-pointer hover:opacity-75"
        onClick={() => onNavigate('profile')}
      >
        <UserIcon className={iconStyle} />
        <span className="text-sm mt-1">Profile</span>
      </div>
    </div>
  );
};

export { NavIcons };