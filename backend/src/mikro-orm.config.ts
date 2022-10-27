import {  EntityCaseNamingStrategy, Configuration, Options, IDatabaseDriver, Connection } from '@mikro-orm/core'

import { Group, SubGroup, User } from 'infra/mikro-orm/entities';
import * as dotenv from 'dotenv';

dotenv.config()

const config: Configuration<IDatabaseDriver<Connection>> | Options<IDatabaseDriver<Connection>> = {
    entities: [ User, Group, SubGroup ],
    type: 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    dbName: 'sales-engine',
    debug: false,
    namingStrategy: EntityCaseNamingStrategy,
    allowGlobalContext: true,
    logger: (message: string) => console.log(`[ORM] - ${message}`)
}

export default config
