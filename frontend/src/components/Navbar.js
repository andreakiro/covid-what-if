import React from 'react';

export default function Nav() {
  return (
    <div className="px-4 md:px-8 lg:px-32 bg-main-600">
      <nav className="flex items-center justify-between py-2">
        <div className="flex items-center lg:w-1/2">
          <div className="flex items-center">
          <div className="hidden mx-4 sm:block">What if...?</div>
          </div>
        </div>
      </nav>
    </div>
  );
}
