import { Component, OnInit } from '@angular/core';
import { Collection, Collections, CollectionsService } from '../services/rests/collections.service';
import { Column } from '../components/table/table.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateCollectionModalComponent } from '../modals/create-collection-modal/create-collection-modal.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  collections: Collections = []
  table_columns: Column[] = [{ columnName: 'Descrição', propertyName: "description" }]

  constructor( 
    private readonly dialog: MatDialog,
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

  openCreateModal(){
    const dialogRef = this.dialog.open(CreateCollectionModalComponent, { width: '400px' })
    
    dialogRef.afterClosed().subscribe(async response => {
      if(response){
        const created = await this.collectionsService.create(response)
        if(created){
          this.collectionsService.load()
        }
      }
    });
  }
  ngOnInit(): void {}

}
