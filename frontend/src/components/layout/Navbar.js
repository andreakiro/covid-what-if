import React from "react";
import { Link } from "react-router-dom";

function NavLink({ style, to, children }) {
  let currentStyle =
    "text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700";
  let notCurrentStyle =
    "text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700";
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        style ? currentStyle : notCurrentStyle
      }`}
    >
      {children}
    </Link>
  );
}

export default function Nav({ currentPage }) {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="ressources/workflow-mark-on-dark.svg"
                  alt="Logo"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink to="/" style={currentPage === "home"}>
                    Home
                  </NavLink>
                  <NavLink to="/simulator" style={currentPage === "simulator"}>
                    Simulator
                  </NavLink>
                  <NavLink to="/team" style={currentPage === "team"}>
                    Team
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <p className="px-3 py-2 rounded-md text-sm font-medium text-gray-300">
                  Covid what if ? By{" "}
                  <a
                    href="https://www.epfl.ch/labs/mlo/igh-intelligent-global-health/"
                    className="hover:text-white hover:font-bold"
                  >
                    IGH EPFL
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
