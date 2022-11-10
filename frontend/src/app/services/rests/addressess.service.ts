import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { createAxios } from 'src/helpers/create-axios';
import { AuthenticationService } from '../authentication.service';
import { Address } from 'src/app/models/entities';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(
    private readonly auth: AuthenticationService
  ){}


  public async create(address: Address): Promise<boolean> {
    const axios = createAxios(this.auth.getToken())
    const response = await axios.post('/address', address)
    if(response.data.created){
      return true
    }
    return false
  }

  public async delete(id: string){
    const axios = createAxios(this.auth.getToken())
    await axios.delete('/address', { params: { id } })
  }

  public async edit(address: Address){
    const axios = createAxios(this.auth.getToken())
    await axios.put('/address', address)
  }

  public async load(id: string){
    const axios = createAxios(this.auth.getToken())
    const response = await axios.get('/address', { params: { customer: id } })
    return response.data.addresses

  }
}
