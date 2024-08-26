import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";

const DashboardNav = ({ searchTerm, onSearch }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage
    console.log(localStorage.getItem("login"));

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userID");
    localStorage.removeItem("email");
    localStorage.removeItem("login");

    console.log("Logged out Successfully!");
    console.log(localStorage.getItem("login"));
    toast.success("Logged out Successfully!");

    // Redirect to the login page
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 border-neutral-700/80 border-b bg-opacity-70 backdrop-blur-lg p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-white font-semibold text-xl tracking-tight space-x-2"
        >
          <img
            src="logo.png" // Replace with your logo path
            alt="Logo"
            className="w-8 h-8" // Adjust size as needed
          />
          <span>QuickPass</span>
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="text-white lg:hidden">
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Search Bar for Desktop */}
        <div className="relative w-1/3 hidden lg:block">
          <input
            type="text"
            value={searchTerm}
            onChange={onSearch}
            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Search passwords..."
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <FiSearch size={20} />
          </div>
        </div>

        {/* Settings Dropdown */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="flex items-center text-white space-x-2">
                <FiUser size={24} />
                <span>Settings</span>
              </MenuButton>
            </div>

            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`${active ? "bg-gray-300 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FiUser className="mr-2" size={18} />
                        Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${active ? "bg-gray-300 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FiLogOut className="mr-2" size={18} />
                        Logout
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${open ? "block" : "hidden"
          } bg-gray-800 bg-opacity-70 backdrop-blur-lg p-4`}
      >
        {/* Search Bar for Mobile */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={onSearch}
            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
            placeholder="Search passwords..."
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <FiSearch size={20} />
          </div>
        </div>

        {/* Settings Dropdown for Mobile */}
        <div className="mt-4">
          <Menu as="div" className="relative">
            <div>
              <MenuButton className="flex items-center text-white space-x-2 w-full">
                <FiUser size={24} />
                <span>Settings</span>
              </MenuButton>
            </div>

            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute left-0 mt-2 w-full origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`${active ? "bg-gray-300 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FiUser className="mr-2" size={18} />
                        Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        onClick={handleLogout}
                        className={`${active ? "bg-gray-300 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <FiLogOut className="mr-2" size={18} />
                        Logout
                      </Link>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
