import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubGroupsService } from 'src/app/services';
import { Column } from '../../components/table/table.component';
import { GroupModalComponent } from '../../modals/group-modal/group-modal.component';
import { Group, Groups, GroupsService } from '../../services/rests/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: Groups = []
  table_columns: Column[] = [{ columnName: 'Descrição', propertyName: "description" }]

  constructor(
    private readonly dialog: MatDialog,
    private readonly groupsService: GroupsService,
    private readonly subgroupsService: SubGroupsService
  ) {
    this.groupsService.groups.subscribe(groups => this.groups = groups )
    this.groupsService.loadGroups()
  }
  async openEditModal(group: Group) {
    const subgroups = await this.subgroupsService.load(group)
    const dialogRef = this.dialog.open(GroupModalComponent, { data: {...group, subgroups: subgroups }, width: '600px' })

    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        const { previous_group, new_group } = response
        this.groupsService.edit(previous_group, new_group)
      }
    });
  }
  onDelete(group: Group){
    this.groupsService.delete(group.description)
  }
  openCreateModal(){
    const dialogRef = this.dialog.open(GroupModalComponent, { data: false, width: '400px' })

    dialogRef.afterClosed().subscribe(async ({ new_group }) => {
      if(new_group){
        console.log(new_group)
        const created = await this.groupsService.createGroup(new_group)
        if(created){
          this.groupsService.loadGroups()
        }
      }
    });
  }
  ngOnInit(): void {}

}
