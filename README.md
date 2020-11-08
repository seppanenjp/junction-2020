# Junction 2020 | Luncher

### Development

Luncher requires [Node.js](https://nodejs.org/) v10+ to run.

Set up Environment variables

```sh
Rename example.env to .env and set correct variables
```

##### Frontend

Install npm packages and start the live server.

```sh
$ cd frontend
$ npm install
$ npm start
```

Open browser url: http://localhost:4200

##### Backend

Install npm packages and start the live server.

```sh
$ cd backend
$ npm install
$ npm run dev:watch
```

API is located here: http://localhost:8080

##### Database

Developing agains local database with [Docker](https://www.docker.com/).

```sh
$ cd infrastructure
$ docker-compose up
```
