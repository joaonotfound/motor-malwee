import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { createAxios } from 'src/helpers/create-axios';
import { AuthenticationService } from '../authentication.service';

export type Group = { description: string }
export type Groups = Array<Group>

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private readonly _groups = new Subject<Groups>()
  
  constructor(
    private readonly auth: AuthenticationService
  ){}
  
  get groups(){ 
    return this._groups.asObservable()
  }

  public async createGroup(group: Group): Promise<boolean> {
    const axios = createAxios(this.auth.getToken())
    const response = await axios.post('/groups', group)
    if(response.data.created){
      return true
    }
    return false
  }

  public async loadGroups(){
    const axios = createAxios(this.auth.getToken())  
    const response = await axios.get('/groups')
    const groups = response.data.groups
    if(groups){
      this._groups.next(groups)
    }

  }
}
