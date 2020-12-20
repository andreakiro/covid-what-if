# Covid What if project

This is the main repostiory for the [`covid-what-if.io`](https://covid-what-if.io) project.
The project is held by the Inteligent Global Health ([IGH](https://www.epfl.ch/labs/mlo/igh-intelligent-global-health/)) group of the [MLO](https://www.epfl.ch/labs/mlo/) lab at EPFL.

# Technologies used

Here's a list of the different technologies used throughout the project, which might be useful to read up on.

- [ReactJS](reactjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [D3JS](https://d3js.org)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)

# General architecture

```
.
├── README.md
├── backend
│   ├── Pipfile
│   ├── Pipfile.lock
│   ├── README.md
│   ├── api.py
│   ├── base
│   ├── data
│   ├── docs
│   ├── modeling
│   └── utils
├── frontend
│   ├── README.md
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   ├── src
│   └── tailwind.js
├── script.sh
├── thesis
│   ├── some documents
└── time.csv
```

See the corresponding READMEs to have a deeper understanding of the backend and frontend architectures.

- [backend](https://github.com/andreakiro/covid/tree/master/backend)
- [frontend](https://github.com/andreakiro/covid/tree/master/frontend)

# Developing

The first tools you need are [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/). `Node` allows us to execute Javascript files as scripts on a server or our own computer, instead of just a web browser. `NPM` allows us to install Javascript libraries and programs.

## Setup backend : Flask server

In the `backend` directory, you can run the Flask server with:

```
pipenv shell 
FLASK_APP=api.py flask run
```

First will start the python virtual environment. <br>
Second will start the Flask server properly.

The server will run on the port 5000.
Open http://localhost:5000 to view it in the browser.

You can use the following commands to close the server and reach back your shel any time :

```
CMD+C
exit
```

## Setup frontend : React

In the `frontend` directory, you can execute:

```
npm start
```

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### TailwindCSS setup

Install dependencies:

```
npm install tailwindcss postcss-cli autoprefixer -D
```

## Summary

Run a development version of the website running the following commands:

```
npm start
FLASK_APP=api.py flask run
```

First one in the `frontend` directory. <br>
Second one in the `backend` directory.

# Scripts

To setup the development version faster, I wrote a tiny script that you can execute with:

```
bash script.sh
```

This command will start frontend server and run backend virtual env. <br>
Note that you'll still need to start the backend server manually. <br>

Note also that you need to have the CLI ttab command. <br>
If you have Node.js installed, just run `npm install -g ttab` <br>

Refer to this [stackoverflow post](https://stackoverflow.com/questions/7171725/open-new-terminal-tab-from-command-line-mac-os-x) for more informations. If you can't manage to make it work, just start servers manually.

# Contributions

Coming soon.