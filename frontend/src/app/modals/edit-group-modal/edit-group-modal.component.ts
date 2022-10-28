import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/services/rests/groups.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SubGroups, SubGroupsService } from 'src/app/services/rests/sub-groups.service';
import { Column } from 'src/app/components/table/table.component';

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
    private readonly dialog: MatDialogRef<EditGroupModalComponent>,
    private readonly subgroupsServices: SubGroupsService,
    @Inject(MAT_DIALOG_DATA) public readonly data: Group
  ) {
    this.subgroupsServices.load(data).then(subgroups => {
      this.subgroups = subgroups
    })
  }

  ngOnInit(): void {
  }
  
  cancel(){
    this.dialog.close()
  }

  create(){
    this.dialog.close(this.data)
  }

}
