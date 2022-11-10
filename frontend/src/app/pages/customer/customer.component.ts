import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressesService } from 'src/app/services/rests/addressess.service';
import { CustomersService } from 'src/app/services/rests/customers.service';
import { Column } from 'src/app/components/table/table.component';
import { AddressModalComponent } from 'src/app/modals/address-modal/address-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Address } from 'src/app/models';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  params: any;
  addresses = []
  table_columns: Column[] = [
    { columnName: 'CPNJ', propertyName: "zip" },
    { columnName: 'Rua', propertyName: "street" },
    { columnName: 'Bairro', propertyName: "district" },
    { columnName: 'Cidade', propertyName: "city" },
    { columnName: 'Estado', propertyName: "state" },
    { columnName: 'País', propertyName: "country" }
    
    
  ]
  constructor(
    private readonly route: ActivatedRoute,
    private readonly customerService: CustomersService,
    private readonly addressesService: AddressesService,
    private readonly dialog: MatDialog
  ) {
    this.route.queryParams.subscribe(params => {
      this.params = params
      this.loadInfo()
    })
  }

  async updateAddresses(){
    this.addresses = await this.addressesService.load(this.params.id)
    console.log(this.addresses)
  }
  async loadInfo(){
    console.log(this.params)
    const customer = await this.customerService.loadOne(this.params.id);
  }
  onEditAddress(data: Address){
    this.dialog.open(AddressModalComponent, { width: '600px', data })
  }
  async onDeleteAddress(address: Address){
    await this.addressesService.delete(address.id!)
    this.updateAddresses()
  }
  onCreateAddress(){
    const dialogRef = this.dialog.open(AddressModalComponent, { width: '600px' })

    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        const address = { ...response, customer: this.params.id }
        this.addressesService.create(address)
        this.updateAddresses()
      }
    });
  }
  ngOnInit(): void {
    this.updateAddresses()
  }

}
