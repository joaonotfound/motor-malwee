import { Injectable } from '@angular/core';
import { Order } from 'src/app/models';
import { createAxios } from 'src/helpers/create-axios';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersItemsService {

    constructor(private readonly auth: AuthenticationService) { }
    
    public async load(orderID: string): Promise<Order[]>{
        const axios = createAxios(this.auth.getToken())
        const response = await axios.get('/orders/items', { params: { id: orderID }})
        return response.data.items
    }
}
