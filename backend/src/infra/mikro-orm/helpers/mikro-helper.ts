import config from '@/mikro-orm.config'
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core'

class MikroHelper {

    private static orm: MikroORM<IDatabaseDriver<Connection>>;

    private static async connect(){
        this.orm = await MikroORM.init(config)
    }
    
    public async getEm(){
        const orm = await MikroHelper.getOrmInstance();
        return orm.em.fork();
    }
    public close() {
        MikroHelper.killOrmInstance()
    }
    private static killOrmInstance(){
        this.orm.close()
    }

    private static async getOrmInstance(){
        if(!this.orm){
            await this.connect()
        }
        return this.orm
    }

}

export const mikroHelper = new MikroHelper();