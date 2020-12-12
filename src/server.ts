import './utils/module_alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ForecastController } from './controller/forecast';
import { Application } from 'express';
import * as database from '@src/database';
import { BeachesController } from './controller/beaches';
import { UsersController } from './controller/users';

export class SetupServer extends Server {
  
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
  }
  private setupControllers(): void {
    const forecastController = new ForecastController();
    const beachesController = new BeachesController();
    const usersController = new UsersController();
    this.addControllers([forecastController, beachesController, usersController]);

  }
  private async databaseSetup(): Promise<void> {
    await database.connect();

  }

  public async close(): Promise<void> {
    await database.close();
  }
  public getApp(): Application {
    return this.app;
  }
  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening of port', this.port);

    });
  }
}
