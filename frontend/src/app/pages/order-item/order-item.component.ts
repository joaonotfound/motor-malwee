import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'src/app/components/table/table.component';
import { OrdersItemsService } from 'src/app/services/rests/orders-items.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrdersItemComponent implements OnInit {

  items: any = []
  params: any = {}
  table_columns: Column[] = [
    { columnName: "Produto", propertyName: 'productDescription'},
    { columnName: 'Quantidade', propertyName: "quantity" },
    { columnName: 'UnitPrice', propertyName: "unitPrice" },
    { columnName: 'TotalPrice', propertyName: "totalPrice" }
  ]

  constructor( 
    private readonly route: ActivatedRoute,
    private readonly itemsService: OrdersItemsService
  ) {
    this.route.queryParams.subscribe(params => {
      this.params = params
      this.loadItems()
    })
  }

  async loadItems(){
    this.items = await this.itemsService.load(this.params.id)
  }

  ngOnInit(): void {
  }

}
