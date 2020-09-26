#!/bin/bash

ttab "cd backend && pipenv shell && FLASK_APP=api.py flask run"
ttab "cd frontend && npm start"