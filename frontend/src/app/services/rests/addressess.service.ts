import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { createAxios } from 'src/helpers/create-axios';
import { AuthenticationService } from '../authentication.service';
import { Address } from 'src/app/models/entities';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  private readonly _addresses = new Subject<Address>()

  constructor(
    private readonly auth: AuthenticationService
  ){}

  addresses(){
    return this._addresses.asObservable()
  }

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
  public async load(id: string){
    const axios = createAxios(this.auth.getToken())
    const response = await axios.get('/address', { params: { customer: id } })
    const addressess = response.data.addresses
    if(addressess){
      this._addresses.next(addressess)
    }

  }
}
