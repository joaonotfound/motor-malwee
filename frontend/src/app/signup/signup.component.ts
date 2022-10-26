import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup = this.createForm()

  hide: boolean         = true
  saveCredentials: any  = ''

  constructor( private readonly fb: FormBuilder ) { }

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

  }
}
