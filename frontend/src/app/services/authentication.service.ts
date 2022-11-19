import { Injectable } from '@angular/core';
import axios from 'axios'
import { Fenvironment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly http = axios.create({ baseURL: `${Fenvironment.backendURL}/auth/logon` })
  private token: string = ''

  constructor() {
    this.loadLocalToken()    
  }

  loadLocalToken(){
    const token = localStorage.getItem('authentication-token')
    if(token != null){
      this.token = token
    }
    
  }

  saveLocalToken(token: string){
    localStorage.setItem('authentication-token', token)
  }

  public getToken(): string {
    return this.token
  }

  async login(email: string, password: string) {
    const body = { email, password }

    const response = await this.http.post('', body)

    if (response.data.token) {
      this.token = response.data.token
      this.saveLocalToken(response.data.token)
      return true      
    }
    return
  }

  async signup(username: string, email: string, password: string) {
    const body = { username, email, password }

    const response = await this.http.put('', body)

    if (response.data.token) {
      this.token = response.data.token
      this.saveLocalToken(response.data.token)
      return true
    }
    return false
  }

}
