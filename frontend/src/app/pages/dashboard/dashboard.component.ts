import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

type MenuItem = { icon: string, path: string, caption: string }
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sidebarOpened: boolean = false
  menu: MenuItem[] = [
    { icon: 'folder', path: '/dashboard/groups', caption: "Grupos" },
    { icon: 'subject', path: '/dashboard/collections', caption: "Coleções" },
    { icon: 'perm_identity', path: '/dashboard/clients', caption: "Clientes" },
    { icon: 'shopping_cart', path: '/dashboard/products', caption: "Produtos" }
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
