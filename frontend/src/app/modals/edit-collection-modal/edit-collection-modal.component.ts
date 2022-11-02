import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Collection } from 'src/app/services/rests/collections.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-collection-modal',
  templateUrl: './edit-collection-modal.component.html',
  styleUrls: ['./edit-collection-modal.component.scss']
})
export class EditCollectionModalComponent implements OnInit {

  previous_data: Collection

  formGroup = this.createFormGroup()

  get description(){
    return this.formGroup.get('description')
  }
  createFormGroup(){
    return this.FormGroup.group({
      description: [this.raw_data.description, [Validators.required]]
    })
  }
  constructor(
    private readonly dialogRef: MatDialogRef<EditCollectionModalComponent>,
    private readonly FormGroup: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public readonly raw_data: Collection
  ) {
    this.previous_data = {...raw_data}
  }

  ngOnInit(): void {
  }

  cancel(){
    this.dialogRef.close()
  }

  create(){
    const new_collection: Collection = {
      description: this.description?.value!
    }
    this.dialogRef.close({ previous_collection: this.previous_data, new_collection })
  }

}
