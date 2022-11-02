import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/models/entities';

@Component({
  selector: 'app-create-customer-modal',
  templateUrl: './create-customer-modal.component.html',
  styleUrls: ['./create-customer-modal.component.scss']
})
export class CreateCustomerModalComponent implements OnInit {


  // data: Partial<Customer> = {}
  formGroup = this.createFormGroup()

  constructor(
    private readonly dialog: MatDialogRef<CreateCustomerModalComponent>,
    private readonly formBuilder: FormBuilder
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

  createFormGroup() {
    return this.formBuilder.group({
      popularName: ['', [Validators.required]],
      CPNJ: ['', [Validators.required]],
      companyName: ['', [Validators.required]]
    })
  }
  cancel() {
    this.dialog.close()
  }

  create() {
    this.dialog.close({
      popularName: this.popularName?.value,
      CPNJ: this.CPNJ?.value,
      companyName: this.companyName?.value
    })
  }


}
