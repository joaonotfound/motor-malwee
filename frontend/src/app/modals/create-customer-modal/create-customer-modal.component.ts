import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Column } from 'src/app/components/table/table.component';
import { AddressModalComponent } from '../address-modal/address-modal.component';

@Component({
  selector: 'app-create-customer-modal',
  templateUrl: './create-customer-modal.component.html',
  styleUrls: ['./create-customer-modal.component.scss']
})
export class CreateCustomerModalComponent implements OnInit {

  customer: any;
  addresses: any[] = []
  table_columns: Column[] = [
    { columnName: 'Cep', propertyName: "zip" },
    { columnName: 'Rua', propertyName: "street" },
    { columnName: 'Cidade', propertyName: "city" },    
  ]

  formGroup = this.createFormGroup()

  constructor(
    private readonly dialogRef: MatDialogRef<CreateCustomerModalComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  get popularName(){
    return this.formGroup.get('popularName')
  }
  get CPNJ(){
    return this.formGroup.get('CPNJ')
  }
  get companyName(){
    return this.formGroup.get('companyName')
  }

  onCreateAddress(){
    const dialogRef = this.dialog.open(AddressModalComponent, { width: '600px' })

    dialogRef.afterClosed().subscribe(async address => {
      if(address){
        this.addresses = [...this.addresses, address]
      }
    });
  }
  createFormGroup() {
    return this.formBuilder.group({
      popularName: ['', [Validators.required]],
      CPNJ: ['', [Validators.required]],
      companyName: ['', [Validators.required]]
    })
  }
  cancel() {
    this.dialogRef.close()
  }

  create() {
    this.dialogRef.close({
      popularName: this.popularName?.value,
      CPNJ: this.CPNJ?.value,
      companyName: this.companyName?.value,
      addresses: this.addresses
    })
  }


}
