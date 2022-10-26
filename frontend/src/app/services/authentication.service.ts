import { Injectable } from '@angular/core';
import axios from 'axios'

type authenticated = Promise<boolean>
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly http = axios.create({ baseURL: 'http://localhost:5000/auth/logon'})

  async login(email: string, password: string): authenticated {
    const body = {
      email, password
    }
    const response = await this.http.post('', body)

    if(response.data.token){
      return true
    }
    return false
  }

  async signup(username: string, email: string, password: string){
    const body = {
      username, email, password
    }
    
    const response = await this.http.put('', body)
    console.log(response)

  }
  constructor() { }
}
