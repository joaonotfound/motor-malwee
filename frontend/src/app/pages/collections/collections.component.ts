import { Component, OnInit } from '@angular/core';
import { Collection, Collections, CollectionsService } from '../../services/rests/collections.service';
import { Column } from '../../components/table/table.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateCollectionModalComponent } from '../../modals/create-collection-modal/create-collection-modal.component';
import { EditCollectionModalComponent } from '../../modals/edit-collection-modal/edit-collection-modal.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  collections$ = this.collections();
  table_columns: Column[] = [{ columnName: 'Descrição', propertyName: "description" }]

  constructor(
    private readonly dialog: MatDialog,
    private readonly collectionsService: CollectionsService
  ) {}

  collections(){
    return this.collectionsService.collections();
  }

  openEditModal(collection: Collection) {
    const dialogRef = this.dialog.open(EditCollectionModalComponent, { data: collection, width: '600px' })

    const subscription = dialogRef.afterClosed().subscribe(async response => {
      if(response){
        const { previous_collection, new_collection } = response
        this.collectionsService.edit(previous_collection, new_collection)
      }
      subscription.unsubscribe()
    });
  }
  filter(query: string){
    console.log(query)
  }
  onDelete(collection: Collection){
    this.collectionsService.delete(collection.description)
  }

  openCreateModal(){
    const dialogRef = this.dialog.open(CreateCollectionModalComponent, { width: '400px' })

    const subscription = dialogRef.afterClosed().subscribe(async response => {
      if(response){
        const created = await this.collectionsService.create(response)
        if(created){
          this.collectionsService.load()
        }
      }
      subscription.unsubscribe()
    });
  }
  ngOnInit(): void {
    this.collectionsService.load()
  }

}
