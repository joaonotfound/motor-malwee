import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

type MenuItem = { icon: string, path: string, caption: string, children?: MenuItem }
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sidebarOpened: boolean = false
  menu: MenuItem[] = [
    { icon: 'home', path: '/dashboard/statistics', caption: "Home" },
    { icon: 'folder', path: '/dashboard/groups', caption: "Grupos" },
    { icon: 'subject', path: '/dashboard/collections', caption: "Coleções" },
    { icon: 'perm_identity', path: '/dashboard/customers', caption: "Clientes" },
    { icon: 'shopping_cart', path: '/dashboard/products', caption: "Produtos" },
    { icon: 'handshake ', path: "/dashboard/orders", caption: "Vendas"}
  ]

  constructor(
    private readonly sidebar: SidebarService
  ){
    this.sidebar.opened.subscribe(
      opened => {         
        this.sidebarOpened = opened
        console.log('changing state...', this.sidebarOpened)
      })
  }

  ngOnInit(): void {
  }

}
