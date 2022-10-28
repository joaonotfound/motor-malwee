import { Injectable } from '@angular/core'; 
import { Group } from './groups.service';
import { AuthenticationService } from '../authentication.service';
import { createAxios } from 'src/helpers/create-axios';

export type SubGroup = { description: string }
export type SubGroups = SubGroup[]

@Injectable({
  providedIn: 'root'
})
export class SubGroupsService {
  
  constructor(
    private readonly auth: AuthenticationService
  ){}

  public async create(group: string, subgroup: SubGroup): Promise<boolean> {
    const axios = createAxios(this.auth.getToken())
    const response = await axios.post('/subgroups', { group, subgroup })
    if(response.data.created){
      return true
    }
    return false
  }

  public async load(group: Group): Promise<SubGroups> {
    const axios = createAxios(this.auth.getToken())  
    console.log(this.auth.getToken())
    const response = await axios.get('/subgroups', { params: { group: group.description }})
    const subgroups = response.data.subgroups
    return subgroups
  }
}
