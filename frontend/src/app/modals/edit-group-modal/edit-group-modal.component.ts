import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/services/rests/groups.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SubGroups, SubGroupsService } from 'src/app/services/rests/sub-groups.service';

@Component({
  selector: 'app-edit-group-modal',
  templateUrl: './edit-group-modal.component.html',
  styleUrls: ['./edit-group-modal.component.scss']
})
export class EditGroupModalComponent implements OnInit {

  subgroups: SubGroups = []
  @Input() data: Partial<Group> = {
    description: ''    
  }

  constructor(
    private readonly dialog: MatDialogRef<EditGroupModalComponent>,
    private readonly subgroupsServices: SubGroupsService
  ) {
    this.subgroupsServices.subGroups.subscribe(subgroups => this.subgroups = subgroups)
    this.subgroupsServices.load()
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
