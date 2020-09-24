# Backend structure

#### api.py

Main file. Basicly is the server. Using python library Flask. See below how to run the server.

#### models

Directory holding all the models we'll use and call from the api.py whenever a requests comes from the frontend.
You can look at the rules of a given request in `docs/rules.md`

#### mergers

Directory containing the files that deal with data merging to then output the data files the models in the `models` directory will use. Those file must be run daily to be up to date with latest data. A script is yet to come.

#### data

Where we actually store the data for the models.

#### static

Where we store static files.

#### docs

You can find any usefull documentation and other informations in this directory.

# Flask server

In the directory, you can run:

#### `pipenv shell`

Run the virtual environment to have access to all the dependencies.

#### `exit`

Exit the virtual environment and reach back your shell.

#### `FLASK_APP=api.py flask run`

Runs the Flask server <br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

# Contributions

Developper and ML engineer `Andrea Pinto` <br>
Epidemiology and ML engineer `Thierry Bossy` <br>
Digital social epidemiology and ML engineer `Lucas Massemin` <br>

# Contributions

Please refer to the README in the root directory for contributions.
