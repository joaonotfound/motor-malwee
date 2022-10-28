import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { AuthenticationService } from '../authentication.service';
import { createAxios } from 'src/helpers/create-axios';

export type SubGroup = { description: string }
export type SubGroups = SubGroup[]

@Injectable({
  providedIn: 'root'
})
export class SubGroupsService {
  private readonly _subgroups = new Subject<SubGroups>()
  
  constructor(
    private readonly auth: AuthenticationService
  ){}
  
  get subGroups(){ 
    return this._subgroups.asObservable()
  }

  public async create(group: SubGroup): Promise<boolean> {
    const axios = createAxios(this.auth.getToken())
    const response = await axios.post('/subgroups', group)
    if(response.data.created){
      return true
    }
    return false
  }

  public async load(){
    const axios = createAxios(this.auth.getToken())  
    const response = await axios.get('/subgroups')
    const groups = response.data.subgroups
    if(groups){
      this._subgroups.next(groups)
    }

  }
}
