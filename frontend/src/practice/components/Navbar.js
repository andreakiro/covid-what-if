import React from 'react';

export default function Nav() {
  return (
    <div className="px-4 md:px-8 lg:px-32 bg-indigo-400 text-3xl">
      <nav className="flex items-center justify-between py-2">
        <div className="flex items-center lg:w-1/2">
          <div className="flex items-center">
          <div className="hidden mx-4 sm:block text-white font-bold">What if ?</div>
          </div>
        </div>
        <div className="hidden mx-4 sm:block text-white font-bold">More</div>
      </nav>
    </div>
  );
}
