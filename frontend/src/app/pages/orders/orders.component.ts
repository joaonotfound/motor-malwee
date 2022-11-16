import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Column } from 'src/app/components/table/table.component';
import { OrderModalComponent } from 'src/app/modals/order-modal/order-modal.component';
import { Order } from 'src/app/models';
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

  constructor( 
    private readonly dialog: MatDialog,
    private readonly ordersService: OrdersService,
    private readonly router: Router ) { }

  ngOnInit(): void {
    this.loadOrders()
  }

  async loadOrders(){
    this.orders = await this.ordersService.load()
  }

  async onEdit(order: Order) {
    this.router.navigate(['/dashboard/orders-items'], { queryParams: { id: order.id }})
  }

  async onDelete(order: Order){
    await this.ordersService.delete(order.id!)
    this.loadOrders()
  }

  createOrder(){  
    const dialogRef = this.dialog.open(OrderModalComponent, { width: '600px' })

    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        this.ordersService.create(response).then(_ => this.loadOrders())
    }})

  }}
