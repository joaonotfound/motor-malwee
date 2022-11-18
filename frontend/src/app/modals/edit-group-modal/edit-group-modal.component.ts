import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/services/rests/groups.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SubGroup, SubGroups } from 'src/app/services/rests/sub-groups.service';
import { Column } from 'src/app/components/table/table.component';
import { CreateSubgroupModalComponent } from '../create-subgroup-modal/create-subgroup-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-group-modal',
  templateUrl: './edit-group-modal.component.html',
  styleUrls: ['./edit-group-modal.component.scss']
})
export class EditGroupModalComponent implements OnInit {

  tableColumns: Column[] = [
    { columnName: 'Descrição', propertyName: "description" }
  ]
  previous_data: Group
  subgroups: SubGroup[] = []

  editor: boolean = false

  formGroup = this.createFormGroup()

  get description() {
    return this.formGroup.get('description')
  }

  // private async loadSubgroups(){
  //   this.subgroups = await this.subgroupsServices.load(this.previous_data);
  // }

  createFormGroup() {
    return this.formBuilder.group({
      description: [this.raw_data.description, [Validators.required]]
    })
  }
  constructor(
    private readonly dialogRef: MatDialogRef<EditGroupModalComponent>,
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public readonly raw_data: Group & { subgroups: SubGroups }
  ) {
    console.log('data: ', raw_data)
    this.previous_data = raw_data
      ? { ...raw_data }
      : { description: '' }
    this.subgroups = raw_data.subgroups ? [...raw_data.subgroups] : []
    this.editor = raw_data.id ? true : false
  }

  ngOnInit(): void {
    // if(this.editor){
    //   this.loadSubgroups()
    // }    
  }
  
  async onDelete(subgroup: SubGroup){
    this.subgroups = this.subgroups.filter(item => item.description != subgroup.description)
    // await this.subgroupsServices.delete(subgroup.description, this.previous_data.description)
    // this.loadSubgroups()
  }

  onCreate() {
    const dialogRef = this.dialog.open(CreateSubgroupModalComponent, { width: '400px' })

    dialogRef.afterClosed().subscribe(async subgroup => {
      if (subgroup) {
        this.subgroups = [...this.subgroups, subgroup]
        // const created = await this.subgroupsServices.create(this.description?.value!, response)
        // if (created) {
          // this.subgroupsServices.load({ description: this.description?.value! }).then(
            // subgroups => this.subgroups = subgroups
          // )
        }
      }
    );
  }
  cancel() {
    this.dialogRef.close()
  }

  create() {
    const new_group = {
      description: this.description?.value!,
      subgroups: this.subgroups
    }
    this.dialogRef.close({ previous_group: this.previous_data, new_group })
  }
}
