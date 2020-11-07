import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as prerender from 'prerender-node';
import * as compression from 'compression';
import 'reflect-metadata';
import 'colors';
import { createConnection } from 'typeorm';
import * as cors from 'cors';
import { config } from 'dotenv';
import { routes } from './routes';
import { Lunch } from './entities/lunch';
import { Participant } from './entities/participant';
import { User } from './entities/user';
import { Restaurant } from './entities/restaurant';
import { FoodType } from './entities/foodType';

const app = express();
config();
const port = process.env.PORT || 8080;

app.use(compression());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(prerender);

createConnection({
  type: 'postgres',
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  entities: [Lunch, Participant, User, Restaurant, FoodType],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations'
  },
  migrationsTableName: 'Migrations',
  synchronize: true,
  migrationsRun: true,
  logging: false
}).then(() => {
  // start the Express server
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`.green);
  });

  app.use('/', routes);
});
