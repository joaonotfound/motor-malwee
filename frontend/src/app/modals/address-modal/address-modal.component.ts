import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Address } from 'src/app/models';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss']
})
export class AddressModalComponent implements OnInit {
  
  formGroup = this.createFormGroup()

  constructor(
    private readonly dialog: MatDialogRef<AddressModalComponent>,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }
   
  get description(){
    return this.formGroup.get('description')
  }

  createFormGroup(){
    return this.formBuilder.group({
      zip: [''],
      street: ['', [Validators.required]],
      district: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      reference: [''],
      complement: ['']
    })
  }

  cancel(){
    this.dialog.close()
  }

  create(){
    this.dialog.close({ description: this.description?.value })
  }

}
