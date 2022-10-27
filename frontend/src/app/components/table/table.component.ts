import { Component, Input, OnInit , Output, EventEmitter} from '@angular/core';

export type Column = { columnName: string, propertyName: string }

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() contentName: string = ''
  @Output() onCreate = new EventEmitter()
  @Input() columns: Column[] = []
  @Input() data: any = []
  constructor() { }

  getDisplayedColumns(){
    return this.columns.map(column => column.propertyName)
  }
  ngOnInit(): void {
  
  }
}
