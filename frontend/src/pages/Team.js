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
        picture="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />
      <Teammate
        fullName="Mary-Anne Hartley"
        link="https://people.epfl.ch/mary-anne.hartley"
        picture="https://people.epfl.ch/private/common/photos/links/204167.jpg?ts=1603027015"
      />
      <Teammate
        fullName="Prakhar Gupta"
        link="https://people.epfl.ch/prakhar.gupta"
        picture="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />
      <Teammate
        fullName=" Thierry Bossy"
        link="https://people.epfl.ch/thierry.bossy"
        picture="https://media-exp1.licdn.com/dms/image/C4D03AQEiZTE3yMYTYg/profile-displayphoto-shrink_400_400/0?e=1608768000&v=beta&t=0p2-Wluph6wDc1o7hHcwfy5o9-kvnTLCNaPn2Ur3vj8"
      />

      <Teammate
        fullName="Andrea Pinto"
        link="https://linkedin.com/in/pinto-andrea/"
        picture="https://media-exp1.licdn.com/dms/image/C5603AQFVsBf9AHAsEA/profile-displayphoto-shrink_400_400/0?e=1608768000&v=beta&t=xiCW7YraTUloPx4sZxW0EzS3FAnXZK4I28a5ylpju6k"
      />

      <Teammate
        fullName=" Lucas Massemin"
        link="https://people.epfl.ch/lucas.massemin"
        picture="https://media-exp1.licdn.com/dms/image/C5603AQF0U8qYYKD9sw/profile-displayphoto-shrink_400_400/0?e=1608768000&v=beta&t=Iu7_OLz0xCwfbKLtVKIpvQAqL5wFPVJkYhy5mqLr29Q"
      />
      <Teammate
        fullName="Kimia Hemmatirad"
        picture="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />
      <Teammate
        fullName="Pablo Canas"
        link="https://people.epfl.ch/pablo.canas"
        picture="https://media-exp1.licdn.com/dms/image/C5603AQFiFNmvbRiotA/profile-displayphoto-shrink_400_400/0?e=1608768000&v=beta&t=lGLgUMjtWip8YCXWhoo9sDDMks66GdPu0wYxrPy0Mas"
      />
    </div>
  );
}
