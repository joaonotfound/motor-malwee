import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderModalComponent } from 'src/app/modals/order-modal/order-modal.component';
import { OrdersService } from 'src/app/services';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor( private readonly dialog: MatDialog, private readonly ordersService: OrdersService ) { }

  ngOnInit(): void {
  }

  createOrder(){
    const dialogRef = this.dialog.open(OrderModalComponent, { width: '600px' })

    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        this.ordersService.create(response)
      }
    });
  }
}
