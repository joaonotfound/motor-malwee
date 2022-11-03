import { Injectable } from '@angular/core';
import { createAxios } from 'src/helpers/create-axios';
import { AuthenticationService } from '../authentication.service';
import { Customer } from 'src/app/models/entities';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private readonly auth: AuthenticationService
  ){}

  public async create(customer: Customer): Promise<boolean> {
    const axios = createAxios(this.auth.getToken())
    const response = await axios.post('/customers', customer)
    if(response.data.created){
      return true
    }
    return false
  }

  async loadOne(cpnj: string){
    const axios = createAxios(this.auth.getToken())
    const response = await axios.get('/customer', { params: { cpnj }} )
    return await response.data
  }

  public async delete(CPNJ: string): Promise<void> {
    const axios = createAxios(this.auth.getToken())
    await axios.delete('/customers', { data: { customer: CPNJ }})
  }
  public async load(): Promise<Customer[]>{
    const axios = createAxios(this.auth.getToken())
    const response = await axios.get('/customers')
    return await response.data.customers

  }
}
