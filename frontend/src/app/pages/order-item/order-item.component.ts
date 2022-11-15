import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrdersItemComponent implements OnInit {

  constructor( private readonly route: ActivatedRoute ) { }

  ngOnInit(): void {
  }

}
