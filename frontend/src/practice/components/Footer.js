import React from 'react';

export default function Footer() {
  return (
    <div className="flex items-center text-3xl text-white bg-purple-400 py-2 font-bold justify-center">
        <a
          className="hover:text-purple-200"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
}