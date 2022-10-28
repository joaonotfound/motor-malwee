import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column } from '../components/table/table.component';
import { CreateGroupModalComponent } from '../modals/create-group-modal/create-group-modal.component';
import { EditGroupModalComponent } from '../modals/edit-group-modal/edit-group-modal.component';
import { Group, Groups, GroupsService } from '../services/rests/groups.service';

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
    private readonly groupsService: GroupsService
  ) {
    this.groupsService.groups.subscribe(groups => this.groups = groups )
    this.groupsService.loadGroups()
  }
  openEditModal(group: Group) {
    const dialogRef = this.dialog.open(EditGroupModalComponent, { data: group })
    
    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        console.log(response)
        // const created = await this.groupsService.createGroup(response)
        // if(created){
          // this.groupsService.loadGroups()
        // }
      }
    });
  }
  filter(query: string){
    console.log(query)
  }
  openCreateModal(){
    const dialogRef = this.dialog.open(CreateGroupModalComponent)
    
    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        const created = await this.groupsService.createGroup(response)
        if(created){
          this.groupsService.loadGroups()
        }
      }
    });
  }
  ngOnInit(): void {}

}
