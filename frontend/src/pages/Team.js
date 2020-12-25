import React from "react";

function Label({ text, link }) {
  return (
    <div className="flex justify-center">
      <span className="rounded-md shadow-sm">
        <a
          href={link}
          className="inline-flex justify-center w-full rounded-md border border-gray-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-blue-600 hover:border-blue-600"
        >
          {text}
        </a>
      </span>
    </div>
  );
}

function Teammate({ fullName, position, picture, link }) {
  return (
    <div className="flex flex-col items-center space-y-4 w-100">
      <img
        className="inline-block h-20 w-20 rounded-full text-white shadow-solid"
        src={picture}
        alt=""
      ></img>

      <Label text={fullName} link={link} />
    </div>
  );
}

export default function Team() {
  return (
    <div className="grid grid-cols-3 gap-x-5 gap-y-10 mt-12">
      <Teammate
        fullName="Martin Jaggi"
        link="https://people.epfl.ch/martin.jaggi"
        picture="/ressources/team/jaggi.jpg"
      />
      <Teammate
        fullName="Mary-Anne Hartley"
        link="https://people.epfl.ch/mary-anne.hartley"
        picture="/ressources/team/hartley.jpg"
      />
      <Teammate
        fullName="Prakhar Gupta"
        link="https://people.epfl.ch/prakhar.gupta"
        picture="/ressources/team/gupta.jpg"
      />
      <Teammate
        fullName=" Thierry Bossy"
        link="https://www.linkedin.com/in/thierry-bossy/"
        picture="/ressources/team/bossy.jpeg"
      />

      <Teammate
        fullName="Andrea Pinto"
        link="https://linkedin.com/in/pinto-andrea/"
        picture="/ressources/team/pinto.jpg"
      />

      <Teammate
        fullName=" Lucas Massemin"
        link="https://www.linkedin.com/in/lucas-massemin-65554815a/"
        picture="/ressources/team/massemin.jpeg"
      />
      <Teammate
        fullName="Kimia Hemmatirad"
        link="https://www.linkedin.com/in/kimiahemmatirad/"
        picture="ressources/team/hemmatirad.jpeg"
      />
      <Teammate
        fullName="Pablo Canas"
        link="https://www.linkedin.com/search/results/all/?keywords=pablo%20canas&origin=GLOBAL_SEARCH_HEADER"
        picture="/ressources/team/canas.jpeg"
      />
    </div>
  );
}
