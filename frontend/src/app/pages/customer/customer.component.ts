import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressesService } from 'src/app/services/rests/addressess.service';
import { CustomersService } from 'src/app/services/rests/customers.service';
import { Column } from 'src/app/components/table/table.component';
import { AddressModalComponent } from 'src/app/modals/address-modal/address-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  params: any;
  addresses$ = this.getAddressess()
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

  getAddressess(){
    return this.addressesService.addresses()
  }
  async loadInfo(){
    console.log(this.params)
    const customer = await this.customerService.loadOne(this.params.id);
  }
  onCreateAddress(){
    const dialogRef = this.dialog.open(AddressModalComponent, { width: '600px' })

    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        const address = { ...response, customer: this.params.id }
        this.addressesService.create(address)
        this.addressesService.load(this.params.id)
      }
    });
  }
  ngOnInit(): void {
    console.log(this.params)
    this.addressesService.load(this.params.id)
  }

}
