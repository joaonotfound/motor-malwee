import { Injectable } from '@angular/core'; 
import { Group } from './groups.service';
import { AuthenticationService } from '../authentication.service';
import { createAxios } from 'src/helpers/create-axios';

export type SubGroup = { id?: string, description: string }
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
  async delete(description: string, groupDescription: string){
    const axios = createAxios(this.auth.getToken())  
    await axios.delete('/subgroups', { data: { description, group: groupDescription }})
  }
  public async load(group: Group) {
    const axios = createAxios(this.auth.getToken())  
    const response = await axios.get('/subgroups', { params: { group: group.description }})
    return response.data.subgroups
  }
  public async edit(subgroup: SubGroup) {
    const axios = createAxios(this.auth.getToken())
    await axios.put('/subgroups', { subgroup })
  }
}
