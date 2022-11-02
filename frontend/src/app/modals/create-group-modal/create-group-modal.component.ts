import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Group } from 'src/app/services/rests/groups.service';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.scss']
})
export class CreateGroupModalComponent implements OnInit {

  formGroup: FormGroup = this.createFormGroup()
  
  constructor(
    private readonly dialog: MatDialogRef<CreateGroupModalComponent>,
    private readonly formBuilder: FormBuilder
  ) { }

  get description(){
    return this.formGroup.get('description')
  }

  createFormGroup(){
    return this.formBuilder.group({
      description: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {}
  
  cancel(){
    this.dialog.close()
  }

  create(){
    this.dialog.close({ description: this.description?.value })
  }

}
