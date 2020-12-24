# Covid What if project

This is the main repostiory for the [`covid-what-if.io`](https://covid-what-if.io) project.
The project is held by the Inteligent Global Health ([IGH](https://www.epfl.ch/labs/mlo/igh-intelligent-global-health/)) group of the [MLO](https://www.epfl.ch/labs/mlo/) lab at EPFL.

# Technologies used

Here's a list of the different technologies used throughout the project, which might be useful to read up on.

- [ReactJS](reactjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [D3JS](https://d3js.org)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [NGINX](https://www.nginx.com)

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

## Setup backend : Flask server

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

## Scripts

To setup the development version faster, I wrote a tiny script that you can execute with:

```
bash script.sh
```

This command will start frontend server and run backend virtual env. <br>
Note that you'll still need to start the backend server manually. <br>

Note also that you need to have the CLI ttab command. <br>
If you have Node.js installed, just run `npm install -g ttab` <br>

Refer to this [stackoverflow post](https://stackoverflow.com/questions/7171725/open-new-terminal-tab-from-command-line-mac-os-x) for more informations. If you can't manage to make it work, just start servers manually.

# Deployment

## Domain Name

The domain : [`covid-what-if.io`](https://covid-what-if.io) comes from GoDaddy.

If you want to transfer property ask to @AP.

## Server

As we do not have a powerfull server at the moment, the website is running on
the personal AP's EC2 Amazon instance. This is sufficient for small usage and
low number of visitors, but need to be changed if we aim to scale the website 
and its audience.

Nevertheless, it's not difficult to transfer the code to another server.

### Architecture

The architecture is quite easy. Let me explain :

```
.
├── ...
├── etc
│   ├── ...
│   ├── nginx
│   ├── ...
├── ...
├── home
│   └── ec2-user
│       ├── ...
│       ├── covid
│       └── ...
├── ...
└── var
    ├── ...
    ├── covid-what-if
    │   ├── asset-manifest.json
    │   ├── index.html
    │   ├── precache-manifest.c6f7a2c2db12e50ebd9642c7ac5cd93b.js
    │   ├── ressources
    │   ├── robots.txt
    │   ├── service-worker.js
    │   └── static
    ├── ...
```

In the `etc` directory, we have the `nginx` configurations. I'll explain later.

The `home` directory is quite explicit. `covid` directory is the project's code.

In the `var` directory, we have a `covid-what-if` directory where we have to put all the static files.
In other words, when you build your project (frontend-part), you have to copy build/. inside this directory.
I'll come back to the procedure later.

## NGINX

To serve the website, I use [NGINX](https://www.nginx.com).

Now that you know that, let's have a deeper look to the `nginx` directory and the configuration files :

```
.
├── etc
│   ├── ...
│   ├── nginx
│   │   ├── ...
│   │   ├── nginx.conf
│   │   └── ...
│   └── ...
└── ...
```

The only file we are intersted in is the `nginx.conf` one :

```
http {

include /etc/nginx/mime.types;
server {
  server_name covid-what-if.io www.covid-what-if.io;

  location /api/ {
    proxy_pass http://localhost:8080/;
  }

  location / {
    root /var/covid-what-if;
  }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/covid-what-if.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/covid-what-if.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}

server {
    if ($host = www.covid-what-if.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = covid-what-if.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


  listen 80;
  listen [::]:80;
  server_name covid-what-if.io www.covid-what-if.io;
    return 404; # managed by Certbot
}
}
events {}
```

### Important

If you do any changes into this `nginx.conf` you have to reload NGINX :

```
sudo nginx -s reload
```

## Deploy new frontend

Whenever you are satisfied with modifications on your local website and want to push it online.
Follow this simple procedure :

- Push to your Git
- SSH into the server
- Pull from your Git
- Build the frontend code
- Copy the built files into `/var/covid-what-if`

In short, when you are into the server, run the following :

```
cd covid
cd frontend
npm run build
sudo cp -r build/. /var/covid-what-if
```

## Deploy new backend

The backend is constantly running on port 8080.
If you do any updates on the backend files and want to push them online. 
Follow this simple procedure :

- Pull from your Git
- Kill the running PID (current backend instance on port 8080)
- Start a new Flask app on a new PID

In short, when you are into the server, run the following :

```
ps -aux | grep python
kill PID
FLASK_APP=api.py flask run --port 8080 1>/dev/null 2>/dev/null &
```

## HTTPS

The website is encrypted with HTTPS. I used [certbot](https://certbot.eff.org) to do that.

It need to be renewed every year but it is very easy and overall : free.

# Contributions

Coming soon.