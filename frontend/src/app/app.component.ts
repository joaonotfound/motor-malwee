import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor( private readonly router: Router ){
    const authenticationToken = localStorage['authentication-token']
    if(!authenticationToken){
      this.router.navigateByUrl('/login')
    }    
  }
}
