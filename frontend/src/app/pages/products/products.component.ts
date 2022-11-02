import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column } from 'src/app/components/table/table.component';
import { CreateProductModalComponent } from 'src/app/modals/create-product-modal/create-product-modal.component';
import { Product } from 'src/app/models/entities/product';
import { ProductsService } from 'src/app/services/rests/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []
  table_columns: Column[] = [
    { columnName: 'Descrição', propertyName: "description" },
    { columnName: 'Preço', propertyName: "price" },
    { columnName: 'Grupo', propertyName: "group" },
    { columnName: 'Subgrupo', propertyName: "subgroup" },
    { columnName: 'Coleção', propertyName: "collection" }
  ]

  constructor(
    private readonly productsService: ProductsService,
    private readonly dialog: MatDialog
  ) {
    this.loadProducts()
  }

  private async loadProducts(){
    this.products = await this.productsService.load()
  }
  async onDelete(product: Product){
    await this.productsService.delete(product.description)
    this.products = await this.productsService.load();
  }
  openCreateModal(){
    const dialogRef = this.dialog.open(CreateProductModalComponent, { width: '400px' })

    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        const created = await this.productsService.create(response)
        if(created){
          this.loadProducts()
        }
      }
    });
  }
  ngOnInit(): void {}

}
