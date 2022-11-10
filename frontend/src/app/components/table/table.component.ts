import { Component, Input, OnInit , Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDeleteModalComponent } from 'src/app/modals/table-delete-modal.ts/table-delete-modal.ts.component';

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
  @Input() title: string = ''
  
  @Output() onCreate = new EventEmitter()
  @Output() onEdit = new EventEmitter()
  @Output() onDelete = new EventEmitter()
  @Output() onFilter = new EventEmitter()

  constructor(
    private readonly dialog: MatDialog
  ) {
    console.log(this.onFilter)
  }

  getDisplayedColumns(){
    const response = [...this.columns.map(column => column.propertyName)]
    
    if(this.onDelete.observed){
      response.push('_delete_row')
    }    

    if(this.onEdit.observed){      
      response.push('_options')

    }
    return response
  }

  openDeleteModal(row: any){
    const ref = this.dialog.open(TableDeleteModalComponent, { width: '400px' })
    const subscription = ref.beforeClosed().subscribe(confirm => {
      if(confirm){
        this.onDelete.emit(row)        
      }
      subscription.unsubscribe()
    })
  }

  selectedRow(row: any){
    console.log(row)
  }

  ngOnInit(): void {
  }
}
