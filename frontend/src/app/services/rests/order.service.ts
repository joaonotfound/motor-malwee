import { Injectable } from '@angular/core';
import { Order } from 'src/app/models';
import { createAxios } from 'src/helpers/create-axios';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

    constructor(private readonly auth: AuthenticationService) { }

    public async create(order: Order): Promise<boolean> {
        const axios = createAxios(this.auth.getToken())
        const response = await axios.post('/order', order)
        if (response.data.created) {
            return true
        }
        return false
    }
    
    public async load(): Promise<Order[]>{
        const axios = createAxios(this.auth.getToken())
        const response = await axios.get('/orders')
        return response.data.orders
    }
}
