import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-table-delete-modal.ts',
  templateUrl: './table-delete-modal.ts.component.html',
  styleUrls: ['./table-delete-modal.ts.component.scss']
})
export class TableDeleteModalComponent implements OnInit {

  constructor(
    private readonly dialogRef: MatDialogRef<TableDeleteModalComponent>
  ) { }

  ngOnInit(): void {
  }

  cancel(){
    this.dialogRef.close()
  }

  confirm(){
    this.dialogRef.close(true)
  }

}
