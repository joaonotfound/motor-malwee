import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderItem } from 'src/app/models';
import { ProductsService } from 'src/app/services';

@Component({
  selector: 'app-order-item-modal',
  templateUrl: './order-item-modal.component.html',
  styleUrls: ['./order-item-modal.component.scss']
})
export class OrderItemModalComponent implements OnInit {

  formGroup: any;
  data = {
    product: '',
    quantity: 0,
  };

  products: any = null;
  addresses: any = null;

  constructor(
    private readonly dialog: MatDialogRef<OrderItemModalComponent>,
    private readonly productsService: ProductsService,
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) raw_data: OrderItem
  ) {
    if (raw_data) {
      this.data = Object.assign({}, this.data, raw_data)
    }
    this.formGroup = this.createFormGroup()
    
  }

  async loadProducts() {
    this.products = await this.productsService.load()
  }

  ngOnInit(): void {
    this.loadProducts()
  }

  createFormGroup() {
    return this.formBuilder.group({
      product: [this.data.product, [Validators.required]],
      quantity: [this.data.quantity, [Validators.required, Validators.min(1)]],
    })
  }

  cancel() {
    this.dialog.close()
  }

  close() {
    const response = {
      product: this.formGroup.get('product')?.value!,
      quantity: this.formGroup.get('quantity')?.value!,
    }
    this.dialog.close(response)
  }
}
