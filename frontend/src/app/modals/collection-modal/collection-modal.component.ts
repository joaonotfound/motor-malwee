import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Collection } from 'src/app/services';

@Component({
  selector: 'app-collection-modal',
  templateUrl: './collection-modal.component.html',
  styleUrls: ['./collection-modal.component.scss']
})
export class CollectionModalComponent implements OnInit {

  private defaultData = {
    description: ""
  }
  readonly formGroup: FormGroup

  constructor(
    private readonly dialog: MatDialogRef<CollectionModalComponent>,
    private readonly formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public readonly raw_data: Collection
  ) {
    if(raw_data){
      this.defaultData = {...raw_data}
    }    
    this.formGroup = this.createFormGroup()
  }

  ngOnInit(): void {
  }
   
  get description(){
    return this.formGroup.get('description')
  }

  createFormGroup(){
    return this.formBuilder.group({
      description: [this.defaultData.description != undefined ? this.defaultData.description : '', [Validators.required]]
    })
  }

  cancel(){
    this.dialog.close()
  }

  confirm(){
    this.dialog.close({ description: this.description?.value })
  }
}
