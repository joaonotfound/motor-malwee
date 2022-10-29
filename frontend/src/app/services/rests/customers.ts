import { Injectable } from '@angular/core';
import { createAxios } from 'src/helpers/create-axios';
import { AuthenticationService } from '../authentication.service';
import { Product } from 'src/app/models/entities/product';
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

  public async load(): Promise<Customer[]>{
    const axios = createAxios(this.auth.getToken())  
    const response = await axios.get('/customers')
    return await response.data.customers

  }
}