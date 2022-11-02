import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-collection-modal',
  templateUrl: './create-collection-modal.component.html',
  styleUrls: ['./create-collection-modal.component.scss']
})
export class CreateCollectionModalComponent implements OnInit {

  
  formGroup = this.createFormGroup()

  constructor(
    private readonly dialog: MatDialogRef<CreateCollectionModalComponent>,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }
   
  get description(){
    return this.formGroup.get('description')
  }

  createFormGroup(){
    return this.formBuilder.group({
      description: ['', [Validators.required]]
    })
  }

  cancel(){
    this.dialog.close()
  }

  create(){
    this.dialog.close({ description: this.description?.value })
  }
}
