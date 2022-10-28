import { Component, OnInit, Inject } from '@angular/core';
import { Collection } from 'src/app/services/rests/collections.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-collection-modal',
  templateUrl: './edit-collection-modal.component.html',
  styleUrls: ['./edit-collection-modal.component.scss']
})
export class EditCollectionModalComponent implements OnInit {

  data: Collection
  previous_data: Collection

  constructor(
    private readonly dialogRef: MatDialogRef<EditCollectionModalComponent>,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public readonly raw_data: Collection
  ) {
    this.data = {...raw_data }
    this.previous_data = {...raw_data}
  }

  ngOnInit(): void {
  }

  cancel(){
    this.dialogRef.close()
  }

  create(){
    this.dialogRef.close({ previous_collection: this.previous_data, new_collection: this.data })
  }

}
