import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from 'src/app/models';
import { createAxios } from 'src/helpers/create-axios';
import { AuthenticationService } from '../authentication.service';

export type Group = { id?: string, description: string }
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
  public async edit(previous_group: Group, new_group: Group){
    const axios = createAxios(this.auth.getToken())
    const response = await axios.put('/groups', { group: previous_group.description, new_group })
    console.log(response)
    this.loadGroups()
  }
  async delete(description: string){
    const axios = createAxios(this.auth.getToken())
    await axios.delete('/groups', { data: { group: description }})
    this.loadGroups()
  }

  public async loadOrders(customerID: string): Promise<Order[]>{
    const axios = createAxios(this.auth.getToken())
    const response = await axios.get('/customer/orders', { params: { customer: customerID }})
    return response.data.orders
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
