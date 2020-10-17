import React from "react";

export default function Nav() {
  return (
    <div>
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img
                  class="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                  alt="Workflow logo"
                />
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a
                    href="#"
                    class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                  >
                    Simulator
                  </a>
                  <a
                    href="#"
                    class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  >
                    Team
                  </a>
                  <a
                    href="#"
                    class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  >
                    Contribute
                  </a>
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <p class="px-3 py-2 rounded-md text-sm font-medium text-gray-300">
                  Covid what if ? By{" "}
                  <a
                    href="https://www.epfl.ch/labs/mlo/igh-intelligent-global-health/"
                    class="hover:text-white hover:font-bold"
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
