import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column } from 'src/app/components/table/table.component';
import { Customer } from 'src/app/models/entities';
import { CustomersService } from 'src/app/services/rests/customers';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = []
  table_columns: Column[] = [
    { columnName: 'Nome Fantasia', propertyName: "popularName" },
    { columnName: 'CPNJ', propertyName: "CPNJ" },
    { columnName: 'Razão Social', propertyName: "companyName" }
  ]

  constructor( 
    private readonly customersService: CustomersService
  ) {
    this.loadCustomers()
  }

  async loadCustomers(){
    this.customers = await this.customersService.load()
  }

  ngOnInit(): void {}

}
