import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Column } from 'src/app/components/table/table.component';
import { CreateCustomerModalComponent } from 'src/app/modals/create-customer-modal/create-customer-modal.component';
import { Customer } from 'src/app/models/entities';
import { CustomersService } from 'src/app/services/rests/customers.service';

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
    private readonly dialog: MatDialog,
    private readonly customersService: CustomersService,
    private readonly router: Router
  ) {
    this.loadCustomers()
  }

  async loadCustomers(){
    this.customers = await this.customersService.load()
  }

  ngOnInit(): void {}

  openCustomerPage(customer: Customer){
    this.router.navigate(['/dashboard/customer/'], { queryParams: { id: customer.id }})
  }

  async onDelete(customer: Customer){
    await this.customersService.delete(customer.CPNJ)
    this.customers = await this.customersService.load()
  }
  openCreateModal(){
    const dialogRef = this.dialog.open(CreateCustomerModalComponent, { width: '400px' })

    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        const created = await this.customersService.create(response)
        if(created){
          this.loadCustomers()
        }
      }
    });
  }
}
