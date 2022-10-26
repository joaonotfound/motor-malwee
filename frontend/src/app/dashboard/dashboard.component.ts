import { Component, OnInit } from '@angular/core';

type MenuItem = { icon: string, path: string, caption: string }
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  opened = false
  menu: MenuItem[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
