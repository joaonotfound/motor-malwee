import { Component, OnInit, Inject } from '@angular/core';
import { Customer, Order } from 'src/app/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AddressesService, CustomersService } from 'src/app/services';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

  formGroup: any;
  data: Order = {
    customer: '',
    address: '',
  };

  customers: any = null;
  addresses: any = null;

  constructor(
    private readonly dialog: MatDialogRef<OrderModalComponent>,
    private readonly customersService: CustomersService,
    private readonly addressService: AddressesService,
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) raw_data: Order
  ) {
    if (raw_data) {
      this.data = Object.assign({}, this.data, raw_data)
    }
    this.formGroup = this.createFormGroup()
    this.loadCustomers()
  }

  async loadCustomers() {
    this.customers = await this.customersService.load()
  }

  async loadAddresses() {
    const customerID = this.formGroup.get('customer')
    this.addresses = await this.addressService.load(customerID.value!)
  }

  ngOnInit(): void {

  }

  createFormGroup() {
    return this.formBuilder.group({
      customer: [this.data.customer, [Validators.required]],
      address: [this.data.address, [Validators.required]],
    })
  }

  cancel() {
    this.dialog.close()
  }

  close() {
    const response = {
      customer: this.formGroup.get('customer')?.value!,
      address: this.formGroup.get('address')?.value!,
    }
    this.dialog.close(response)
  }

}
