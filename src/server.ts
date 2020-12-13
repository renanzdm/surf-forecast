import './utils/module_alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ForecastController } from './controller/forecast';
import { Application } from 'express';
import * as http from 'http';
import expressPino from 'express-pino-logger';
import cors from 'cors';
import * as database from '@src/database';
import { BeachesController } from './controller/beaches';
import { UsersController } from './controller/users';
import logger from './logger';

export class SetupServer extends Server {
  private server?: http.Server;
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(
      expressPino({
        logger,
      })
    );
    this.app.use(cors());
  }
  private setupControllers(): void {
    const forecastController = new ForecastController();
    const beachesController = new BeachesController();
    const usersController = new UsersController();
    this.addControllers([
      forecastController,
      beachesController,
      usersController,
    ]);
  }
  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
    if (this.server) {
      await new Promise<void>((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }
  }
  public getApp(): Application {
    return this.app;
  }
  public start(): void {
    this.app.listen(this.port, () => {
      logger.info('Server listening of port ' + this.port);
    });
  }
}
