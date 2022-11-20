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
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss']
})
export class GroupModalComponent implements OnInit {

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

  createFormGroup() {
    return this.formBuilder.group({
      description: [this.raw_data.description, [Validators.required]]
    })
  }
  constructor(
    private readonly dialogRef: MatDialogRef<GroupModalComponent>,
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public readonly raw_data: Group & { subgroups: SubGroups }
  ) {
    this.previous_data = raw_data
      ? { ...raw_data }
      : { description: '' }
    this.subgroups = raw_data.subgroups ? [...raw_data.subgroups] : []
    this.editor = raw_data.id ? true : false
  }

  ngOnInit(): void {}
  
  async onDelete(subgroup: SubGroup){
    this.subgroups = this.subgroups.filter(item => item.description != subgroup.description)
  }

  onCreate() {
    const dialogRef = this.dialog.open(CreateSubgroupModalComponent, { width: '400px' })

    dialogRef.afterClosed().subscribe(async subgroup => {
      if (subgroup) {
        this.subgroups = [...this.subgroups, subgroup]
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
