import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Collection } from 'src/app/services/rests/collections.service';

@Component({
  selector: 'app-create-collection-modal',
  templateUrl: './create-collection-modal.component.html',
  styleUrls: ['./create-collection-modal.component.scss']
})
export class CreateCollectionModalComponent implements OnInit {

  
  data: Partial<Collection> = {
    description: ''    
  }

  constructor(
    private readonly dialog: MatDialogRef<CreateCollectionModalComponent>
  ) { }

  ngOnInit(): void {
  }
  
  cancel(){
    this.dialog.close()
  }

  create(){
    this.dialog.close(this.data)
  }


}
