import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/services/rests/groups.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SubGroup, SubGroups, SubGroupsService } from 'src/app/services/rests/sub-groups.service';
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
  subgroups: SubGroups = []
  previous_data: Group

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
    private readonly dialogRef: MatDialogRef<EditGroupModalComponent>,
    private readonly dialog: MatDialog,
    private readonly subgroupsServices: SubGroupsService,
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public readonly raw_data: Group
  ) {
    this.previous_data = { ...raw_data }

    this.subgroupsServices.load({ description: this.description?.value! }).then(subgroups => {
      this.subgroups = subgroups
    })
  }

  ngOnInit(): void {
  }
  
  async deleteSubgroup(subgroup: SubGroup){
    await this.subgroupsServices.delete(subgroup.description, this.previous_data.description)
    this.subgroups = await this.subgroupsServices.load(this.previous_data)
  }

  openCreateSubGrupoModal() {
    const dialogRef = this.dialog.open(CreateSubgroupModalComponent, { width: '400px' })

    dialogRef.afterClosed().subscribe(async response => {
      if (response) {
        const created = await this.subgroupsServices.create(this.description?.value!, response)
        if (created) {
          this.subgroups = await this.subgroupsServices.load({ description: this.description?.value! })
        }
      }
    });
  }
  cancel() {
    this.dialogRef.close()
  }

  create() {
    const new_group: Group = {
      description: this.description?.value!
    }

    this.dialogRef.close({ previous_group: this.previous_data, new_group })
  }

}
