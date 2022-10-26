import { Component, OnInit } from '@angular/core';
import {  Validators, FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.createForm()

  hide: boolean         = true
  saveCredentials: any  = ''

  constructor(
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {}

  createForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }) 
  }

  login(){
    if(this.form.invalid){
      alert(`Insira um usuário e senha válidos`)
      return;
    }

    const username = this.form.get('username')
    const password = this.form.get('password')
    
    console.log('authenticando...')
  }
}
