import { Injectable } from '@angular/core'; 
import axios from 'axios';
import { Address } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ZipcodeService {

  constructor(){}

  public async load(zip: string): Promise<Partial<Address>>{
    const response = await axios.get(`http://viacep.com.br/ws/${zip}/json/`)
    const data = response.data
    if(response.status = 200){
        return {
            street: data.logradouro,
            district: data.bairro,
            city: data.localidade,
            state: data.uf,
            country: "Brasil"
        }
    }
    return {}
    }
}