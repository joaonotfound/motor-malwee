import { Component, Input, OnInit , Output, EventEmitter} from '@angular/core';

export type Column = { columnName: string, propertyName: string }

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  filter: string = ''
  @Input() contentName: string = ''  
  @Input() columns: Column[] = []
  @Input() data: any = []

  @Output() onCreate = new EventEmitter()
  @Output() onEdit = new EventEmitter()
  @Output() onFilter = new EventEmitter()

  constructor() { }

  getDisplayedColumns(){
    return [...this.columns.map(column => column.propertyName), '_options']
  }

  selectedRow(row: any){
    console.log(row)
  }

  ngOnInit(): void {
  }
}
