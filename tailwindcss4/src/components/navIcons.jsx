import React from 'react';
import {
  HomeIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const iconStyle = "h-7 w-7";
const plusIconStyle = "h-8 w-8";

const NavIcons = () => {
  return (
    <div className="flex w-full items-end px-11">
      <div className="flex flex-col items-center">
        <HomeIcon className={iconStyle} />
        <span className="text-sm mt-1">Home</span>
      </div>
      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
        <div className="bg-gray-700 rounded-full p-6 shadow-lg">
          <PlusIcon className={`${plusIconStyle} text-white`} />
        </div>
      </div>
      <div className="flex flex-col items-center ml-auto">
        <UserIcon className={iconStyle} />
        <span className="text-sm mt-1">Profile</span>
      </div>
    </div>
  );
};

export { NavIcons };