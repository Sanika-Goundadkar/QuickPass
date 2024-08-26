// immport logo from the componets & use as {logo} in source, no -> ""
import { navItems } from "../constants";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileDrawerOpen, setMobibileDrawerOpen] = useState(false);
  const toggleNavbar = () => {
    setMobibileDrawerOpen(!mobileDrawerOpen);
  };
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="flex items-center text-white font-semibold text-xl tracking-tight space-x-2"
            >
              <img className="h-10 w-10 mr-2" src="/logo.png" alt="logo" />
              <span className="text-xl font-semibold tracking-tight">
                QuickPass
              </span>
            </Link>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <Link
              to="/login"
              className="py-2 px-3 border rounded-md"
              title="Login to your QuickPass account"
            >
              Sign In &nbsp; &gt;
            </Link>

            <Link
              to="/register"
              className="py-2 px-3 border rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
              title="Register to QuickPass"
            >
              Join QuickPass &nbsp; &gt;
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-2">
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <Link to="/login" className="py-2 px-3 border rounded-md">
                Sign In &nbsp; &gt;
              </Link>
              <Link
                to="/register"
                className="py-2 px-3 border rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
              >
                Create an account &nbsp; &gt;
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
