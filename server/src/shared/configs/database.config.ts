import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV_CONST } from '../consts';
import { ALL_ENTITIES } from '../../entities';
import 'dotenv/config';

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env[ENV_CONST.DB_HOST],
  port: parseInt(process.env[ENV_CONST.DB_PORT]),
  username: process.env[ENV_CONST.DB_USERNAME],
  password: process.env[ENV_CONST.DB_PASSWORD],
  database: process.env[ENV_CONST.DB_NAME],
  entities: [...ALL_ENTITIES],

  synchronize: true,
};
