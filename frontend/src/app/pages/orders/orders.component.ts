import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column } from 'src/app/components/table/table.component';
import { OrderModalComponent } from 'src/app/modals/order-modal/order-modal.component';
import { OrdersService } from 'src/app/services';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any = []
  table_columns: Column[] = [
    { columnName: 'Cliente', propertyName: "companyName" },
    { columnName: 'Cidade', propertyName: "city" },
    { columnName: 'Estado', propertyName: "state" }
  ]

  constructor( private readonly dialog: MatDialog, private readonly ordersService: OrdersService ) { }

  ngOnInit(): void {
    this.loadOrders()
  }

  async loadOrders(){
    this.orders = await this.ordersService.load()
  }

  createOrder(){  
    const dialogRef = this.dialog.open(OrderModalComponent, { width: '600px' })

    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        this.ordersService.create(response).then(_ => this.loadOrders())
    }})

  }}
