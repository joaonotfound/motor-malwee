

export class Entity {    
    public id?: number
    public status?: number
    constructor( id: number = 0, status: number = 0 ){ 
        this.id = id
        this.status = status
    }
}