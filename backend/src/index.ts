import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as prerender from 'prerender-node';
import * as compression from 'compression';
import 'reflect-metadata';
import 'colors';
import { createConnection, Generated } from 'typeorm';
import { config } from 'dotenv';
import { routes } from './routes';
import { Lunch } from './entities/lunch';
import { Participant } from './entities/participant';
import { User } from './entities/user';
import { Restaurant } from './entities/restaurant';
import { generateRestaurant } from './fixtures/generate';

const app = express();
config();
const port = process.env.PORT || 8080;

app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(prerender);

export const connection = createConnection({
  type: 'postgres',
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  entities: [Lunch, Participant, User, Restaurant],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations'
  },
  migrationsTableName: 'Migrations',
  synchronize: true,
  migrationsRun: true,
  logging: false
}).then(() => {

  generateRestaurant('Barbarossa', 1, 60.168265, 24.930987, 'Pizzaa');
  generateRestaurant('Singapore Hot Wok', 2, 60.169161, 24.933669, 'Numero 1, Numero 2, Numero 3');
  generateRestaurant('McDonalds', 1, 60.169005, 24.929982, 'Big Mac & Cheesburger');
  generateRestaurant('Noodle Master', 2, 60.171396, 24.926701, 'Dan Dan noodles');
  
  // start the Express server
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`.green);
  });
  
  app.use('/', routes);
});
