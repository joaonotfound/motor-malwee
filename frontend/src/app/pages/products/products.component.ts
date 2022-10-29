import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/components/table/table.component';
import { Product } from 'src/app/models/entities/product';
import { ProductsService } from 'src/app/services/rests/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []
  table_columns: Column[] = [
    { columnName: 'Descrição', propertyName: "description" },
    { columnName: 'Grupo', propertyName: "group" },
    { columnName: 'Subgrupo', propertyName: "subgroup" },
    { columnName: 'Coleção', propertyName: "collection" }
  ]

  constructor( 
    private readonly productsService: ProductsService
  ) {
    this.loadProducts()
  }

  private async loadProducts(){
    this.products = await this.productsService.load()
  }

  ngOnInit(): void {}

}
