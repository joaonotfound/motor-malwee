import { Injectable } from '@angular/core';
import { createAxios } from 'src/helpers/create-axios';
import { AuthenticationService } from '../authentication.service';
import { Product } from 'src/app/models/entities/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  constructor(
    private readonly auth: AuthenticationService
  ){}

  public async create(product: Product): Promise<boolean> {
    const axios = createAxios(this.auth.getToken())
    const response = await axios.post('/products', product)
    if(response.data.created){
      return true
    }
    return false
  }

  public async load(): Promise<Product[]>{
    const axios = createAxios(this.auth.getToken())  
    const response = await axios.get('/products')
    return await response.data.products

  }
}
