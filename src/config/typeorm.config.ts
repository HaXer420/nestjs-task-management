/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import * as config from 'config';

const dbConfig = config.get<any>('db');

export const typeOrmConfig: TypeOrmModule = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  autoLoadEntities: true,
  // entities: [Task],
  synchronize: true,
};
