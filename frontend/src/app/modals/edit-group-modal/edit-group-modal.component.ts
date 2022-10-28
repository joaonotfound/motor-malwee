import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/services/rests/groups.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SubGroups, SubGroupsService } from 'src/app/services/rests/sub-groups.service';
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

  constructor(
    private readonly dialogRef: MatDialogRef<EditGroupModalComponent>,
    private readonly dialog: MatDialog,
    private readonly subgroupsServices: SubGroupsService,
    @Inject(MAT_DIALOG_DATA) public readonly data: Group
  ) {
    this.subgroupsServices.load(data).then(subgroups => {
      this.subgroups = subgroups
    })
  }

  ngOnInit(): void {
  }
  
  openCreateSubGrupoModal(){
    const dialogRef = this.dialog.open(CreateSubgroupModalComponent, { width: '400px' })
    
    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        const created = await this.subgroupsServices.create(this.data.description, response)
        if(created){
          this.subgroups = await this.subgroupsServices.load(this.data)
        }
      }
    });
  }
  cancel(){
    this.dialogRef.close()
  }

  create(){
    this.dialogRef.close(this.data)
  }

}
