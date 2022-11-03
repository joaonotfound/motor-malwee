import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  params: any;
  constructor(private readonly route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.params = params
      this.loadInfo()
    })
  }

  loadInfo(){

  }
  ngOnInit(): void {}

}
