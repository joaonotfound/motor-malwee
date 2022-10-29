import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/models/entities';

@Component({
  selector: 'app-create-customer-modal',
  templateUrl: './create-customer-modal.component.html',
  styleUrls: ['./create-customer-modal.component.scss']
})
export class CreateCustomerModalComponent implements OnInit {

 
  data: Partial<Customer> = {}

  constructor(
    private readonly dialog: MatDialogRef<CreateCustomerModalComponent>
  ) { }

  ngOnInit(): void {
  }
  
  cancel(){
    this.dialog.close()
  }

  create(){
    this.dialog.close(this.data)
  }


}
