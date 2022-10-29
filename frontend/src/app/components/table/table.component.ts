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
  @Output() onDelete = new EventEmitter()
  @Output() onFilter = new EventEmitter()

  constructor() {
    console.log(this.onFilter)
  }

  getDisplayedColumns(){
    const response = [...this.columns.map(column => column.propertyName)]
    
    response.push('_delete_row')

    if(this.onEdit.observers.length != 0){      
      response.push('_options')

    }
    return response
  }

  selectedRow(row: any){
    console.log(row)
  }

  ngOnInit(): void {
  }
}
