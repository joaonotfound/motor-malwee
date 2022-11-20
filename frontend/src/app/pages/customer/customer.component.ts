import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressesService } from 'src/app/services/rests/addressess.service';
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
  customer: any;
  addresses = []
  table_columns: Column[] = [
    { columnName: 'Cep', propertyName: "zip" },
    { columnName: 'Rua', propertyName: "street" },
    { columnName: 'Cidade', propertyName: "city" },    
  ]
  constructor(
    private readonly route: ActivatedRoute,
    private readonly addressesService: AddressesService,
    private readonly dialog: MatDialog
  ) {
    this.route.data.subscribe((data: any) => {
      this.customer = data.customer
    })
  }

  async updateAddresses(){
    this.addresses = await this.addressesService.load(this.customer.id)
  }

  onEditAddress(data: Address){
    const dialogRef = this.dialog.open(AddressModalComponent, { width: '600px', data })

    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        const address = { ...response, customer: this.customer.id }
        await this.addressesService.edit(address)
        this.updateAddresses()
      }
    });
  }
  async onDeleteAddress(address: Address){
    await this.addressesService.delete(address.id!)
    this.updateAddresses()
  }
  onCreateAddress(){
    const dialogRef = this.dialog.open(AddressModalComponent, { width: '600px' })

    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        const address = { ...response, customer: this.customer.id }
        this.addressesService.create(address)
        this.updateAddresses()
      }
    });
  }
  ngOnInit(): void {
    this.updateAddresses()
  }

}
