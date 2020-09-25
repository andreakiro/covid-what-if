import React from 'react';

export default function Footer() {
  return (
    <div className="flex items-center text-2xl text-white bg-indigo-400 py-2 font-bold justify-center">
        <a
          className="hover:text-indigo-200"
          href="https://github.com/andreakiro/covid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
    </div>
  );
}