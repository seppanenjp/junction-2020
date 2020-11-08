# Junction 2020 | Luncher

### Development

Luncher requires [Node.js](https://nodejs.org/) v10+ to run.

Set up Environment variables

```sh
Rename example.env to .env and add missing variables
```

##### Frontend

Install the dependencies and devDependencies and start the live server.

```sh
$ cd frontend
$ npm install
$ npm start
```

Open browser url: http://localhost:4200

##### Backend

Install the dependencies and devDependencies and start the live server.

```sh
$ cd backend
$ npm install
$ npm run dev:watch
```

API can be found from http://localhost:8080

##### Database

Developing agains local database with [Docker](https://www.docker.com/).

```sh
$ cd infrastructure
$ docker-compose up
```
