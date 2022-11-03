import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/rests/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  params: any;
  constructor(private readonly route: ActivatedRoute, private readonly customerService: CustomersService) {
    this.route.queryParams.subscribe(params => {
      this.params = params
      this.loadInfo()
    })
  }

  async loadInfo(){
    console.log(this.params)
    const customer = await this.customerService.loadOne(this.params.cpnj);
    console.log('customer: ', customer)
  }
  ngOnInit(): void {}

}
