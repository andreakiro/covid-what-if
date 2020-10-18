import React from "react";

function Label({ text }) {
  return (
    <div class="flex justify-center">
      <span class="rounded-md shadow-sm">
        <p class="inline-flex justify-center w-full rounded-md border border-gray-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700">
          {text}
        </p>
      </span>
    </div>
  );
}

function Teammate({ fullName, position, picture, links }) {
  return (
    <div class="flex flex-col space-x-8 space-y-4 w-100">
      <div class="flex justify-center">
        <img
          class="inline-block h-20 w-20 rounded-full text-white shadow-solid justify-center"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        ></img>
      </div>
      <div class="flex justify-center">
        <Label text={fullName} />
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <div className="flex flex-col space-y-12 mt-12">
      <div class="flex justify-center w-full">
        <Teammate fullName="Martin Jaggi" />
        <Teammate fullName="Mary-Anne Hartley" />
        <Teammate fullName="Prakhar Gupta" />
        <Teammate fullName="Andrea Pinto" />
      </div>
      <div class="flex justify-center w-full">
        <Teammate fullName="Martin Jaggi" />
        <Teammate fullName="Mary-Anne Hartley" />
        <Teammate fullName="Prakhar Gupta" />
        <Teammate fullName="Andrea Pinto" />
      </div>
    </div>
  );
}
