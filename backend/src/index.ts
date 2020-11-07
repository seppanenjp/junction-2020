import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as prerender from 'prerender-node';
import * as compression from 'compression';
import 'reflect-metadata';
import 'colors';
import { createConnection } from 'typeorm';
import { config } from 'dotenv';

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
  entities: [],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations'
  },
  migrationsTableName: 'Migrations',
  synchronize: false,
  migrationsRun: true,
  logging: false
}).then(() => {
  app.get('/', (req, res) => {
    res.send('Hello world!');
  });

  // start the Express server
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`.green);
  });
});
