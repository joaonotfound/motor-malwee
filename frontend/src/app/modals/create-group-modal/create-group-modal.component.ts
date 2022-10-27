import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Group } from 'src/app/services/rests/groups.service';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.scss']
})
export class CreateGroupModalComponent implements OnInit {

  data: Partial<Group> = {
    description: ''    
  }

  constructor(
    private readonly dialog: MatDialogRef<CreateGroupModalComponent>
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
