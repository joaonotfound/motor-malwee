import { Component, OnInit } from '@angular/core';
import { Collection, Collections, CollectionsService } from '../services/rests/collections.service';
import { Column } from '../components/table/table.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  collections: Collections = []
  table_columns: Column[] = [{ columnName: 'Descrição', propertyName: "description" }]

  constructor( 
    // private readonly dialog: MatDialog,
    private readonly collectionsService: CollectionsService
  ) {
    this.collectionsService.collections.subscribe(collections => this.collections = collections )
    this.collectionsService.load()
  }
  // openEditModal(collection: Collection) {
  //   const dialogRef = this.dialog.open(EditGroupModalComponent, { data: group, width: '600px' })
    
  //   dialogRef.afterClosed().subscribe(async response => {
  //     if(response){
  //       const { previous_group, new_group } = response
  //       this.collectionsService.edit(previous_group, new_group)
  //     }
  //   });
  // }
  // filter(query: string){
  //   console.log(query)
  // }

  // openCreateModal(){
  //   const dialogRef = this.dialog.open(CreateGroupModalComponent, { width: '400px' })
    
  //   dialogRef.afterClosed().subscribe(async response => {
  //     if(response){
  //       const created = await this.collectionsService.createGroup(response)
  //       if(created){
  //         this.collectionsService.loadGroups()
  //       }
  //     }
  //   });
  // }
  ngOnInit(): void {}

}
