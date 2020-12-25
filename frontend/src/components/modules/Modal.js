import React from "react";

export default function Modal({ title, open, onClose }) {
  return (
    <div className={`fixed z-10 inset-0 ${open ? "" : "hidden"}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  {title}
                </h3>
                <div className="flex flex-col space-y-2 mt-2">
                  <p className="text-sm leading-5 text-gray-500">
                    <span className="font-bold text-base">1. </span>Choose a
                    COUNTRY from the list. This will load all historical R0 data
                    of COVID-19, as well as the policies in place. But also a
                    simulated R0 value, predicted by our ML model.
                  </p>
                  <p className="text-sm leading-5 text-gray-500">
                    <span className="font-bold text-base">2. </span>Play with
                    the POLICIES and see how the prediction evolves. You can
                    either add/remove policies, either change their stringencies
                    over time by clicking on the blue boxes. Note that you can
                    also reframe the graph by updating the TIME FRAME
                    fields.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={onClose}
              >
                Close
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
