import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Dashboard } from '@/assets/icons';
import logo from '@/assets/images/logo.png';

/**
 * @function Sidebar
 * @returns {ReactElement.FC}
 */
const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <div className={`lg:flex lg:flex-col w-full bg-[#101826] text-white`}>
        <div className="py-8 max-md:px-1 max-md:py-6 px-8 border-b border-[#2d3749]">
          <img src={logo} alt="logo" className="" />
        </div>
        <ul className="space-y-2 flex flex-col mt-4">
          <li
            className={`mb-4 cursor-pointer max-md:px-2 px-8 py-3 rounded-md group flex items-center ${
              location.pathname === '/'
                ? 'bg-[#292F3B] text-[#10B989]'
                : 'hover:bg-[#292F3B] text-[#EDF2F7] group-hover:text-[#10B989]'
            }`}
          >
            <Link
              to="/"
              className="flex max-md:justify-center items-center w-full"
            >
              <Dashboard className="max-md:mr-0 size-6 mr-6 text-current" />
              <p className="max-md:hidden lg:text-xl text-2xl font-semibold">
                Dashboard
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
