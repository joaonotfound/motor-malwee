import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup = this.createForm()

  hide: boolean         = true
  saveCredentials: any  = ''

  constructor( 
    private readonly fb: FormBuilder,
    private readonly auth: AuthenticationService,
    private readonly router: Router
  ) { }

  createForm() {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }) 
  }

  ngOnInit(): void {
  }
  async signup(){
    if(this.form.invalid) return

    const username = this.form.get('username')?.value
    const email = this.form.get('email')?.value
    const password = this.form.get('password')?.value
    
    const success = await this.auth.signup(username, email, password)
    if(success){
      this.router.navigateByUrl('/dashboard')
    }
  }
}
