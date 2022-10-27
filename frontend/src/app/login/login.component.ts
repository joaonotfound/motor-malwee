import { Component, OnInit } from '@angular/core';
import {  Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

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
    private readonly fb: FormBuilder,
    private readonly auth: AuthenticationService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {}

  createForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }) 
  }

  async login(){
    if(this.form.invalid) return

    const username = this.form.get('email')?.value
    const password = this.form.get('password')?.value

    const success = await this.auth.login(username, password)
    if(success){
      this.router.navigateByUrl('/dashboard')
    }
  }
}
