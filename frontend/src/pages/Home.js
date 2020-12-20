import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col w-10/12 mt-8 mb-8">
      <div className="flex items-start pb-4">
        <div className="w-1/2 flex flex-col justify-center space-y-6">
          <div className="block text-2xl leading-5 space-y-2">
            <h2 id="listbox-label" className="font-bold text-gray-700">
              What if ?
            </h2>
            <p id="listbox-label" className="font-medium text-gray-700">
              Global <span className="font-bold text-red-500">COVID-19</span>{" "}
              policy simulator
            </p>
          </div>
          <p className="block text-xl leading-5 text-gray-700 font-light">
            Web interface for public and policymakers to explore the health and
            societal impacts of COVID-19 policies.
          </p>
          <div className="flex flex-col justify-center">
            <label
              id="listbox-label"
              className="text-base leading-5 text-gray-700 font-light"
            >
              Developped by EPFL
            </label>
            <label
              id="listbox-label"
              className="text-base leading-5 text-gray-700 font-light"
            >
              Machine Learning and Optimization Laboratory
            </label>
            <label
              id="listbox-label"
              className="text-base leading-5 text-gray-700 font-light"
            >
              Intelligent Global Health team
            </label>
          </div>
          <div className="w-1/2">
            <span className="rounded-md shadow-sm">
              <button className="inline-flex justify-center w-full rounded-md border border-gray-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
                <Link to="/simulator">Try the simulator now !</Link>
              </button>
            </span>
          </div>
        </div>
        <img
          className="rounded-md shadow w-1/2 mt-32"
          src="ressources/corona-virus-ab.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
