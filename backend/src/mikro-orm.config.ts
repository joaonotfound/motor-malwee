import {  EntityCaseNamingStrategy, Configuration, Options, IDatabaseDriver, Connection } from '@mikro-orm/core'

import { Group, SubGroup, User, Collection, Product, Customer, Address, Order, OrderItem } from 'infra/mikro-orm/entities';
import * as dotenv from 'dotenv';

dotenv.config()

const getDatabasePort = (): number => process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306

const config: Configuration<IDatabaseDriver<Connection>> | Options<IDatabaseDriver<Connection>> = {
    entities: [ User, Group, SubGroup, Collection, Product, Customer, Address, Order, OrderItem ],
    type: 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    dbName: process.env.DB_NAME || 'sales-engine',
    host: process.env.DB_HOST || 'localhost',
    port: getDatabasePort(),
    debug: false,    
    namingStrategy: EntityCaseNamingStrategy,
    allowGlobalContext: true,
    logger: (message: string) => console.log(`[ORM] - ${message}`)
}

export default config
