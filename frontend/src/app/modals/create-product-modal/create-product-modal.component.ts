import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/entities/product';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-product-modal',
  templateUrl: './create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.scss']
})
export class CreateProductModalComponent implements OnInit {

  
  data: Partial<Product> = {
    description: ''    
  }

  constructor(
    private readonly dialog: MatDialogRef<CreateProductModalComponent>
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
