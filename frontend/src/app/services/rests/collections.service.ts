import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { createAxios } from 'src/helpers/create-axios';
import { AuthenticationService } from '../authentication.service';

export type Collection = { description: string }
export type Collections = Array<Collection>

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  private readonly _collections = new Subject<Collections>()

  constructor(
    private readonly auth: AuthenticationService
  ){}

  collections(){
    return this._collections.asObservable()
  }

  public async create(collection: Collection): Promise<boolean> {
    const axios = createAxios(this.auth.getToken())
    const response = await axios.post('/collections', collection)
    if(response.data.created){
      return true
    }
    return false
  }

  public async edit(previous_collection: Collection, new_collection: Collection){
    const axios = createAxios(this.auth.getToken())
    await axios.put('/collections', { collection: previous_collection.description, new_collection })
    this.load()
  }

  public async delete(description: string){
    const axios = createAxios(this.auth.getToken())
    const response = await axios.delete('/collections', { data: { collection: description } })
    this.load()
    return response.data.deleted
  }

  public async load(){
    const axios = createAxios(this.auth.getToken())
    const response = await axios.get('/collections')
    const collections = response.data.collections
    if(collections){
      this._collections.next(collections)
    }

  }
}
