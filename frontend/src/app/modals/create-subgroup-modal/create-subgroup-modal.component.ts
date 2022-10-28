import { Component, OnInit } from '@angular/core';
import { SubGroup } from 'src/app/services/rests/sub-groups.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-subgroup-modal',
  templateUrl: './create-subgroup-modal.component.html',
  styleUrls: ['./create-subgroup-modal.component.scss']
})
export class CreateSubgroupModalComponent implements OnInit {

  data: Partial<SubGroup> = {
    description: ''    
  }

  constructor(
    private readonly dialog: MatDialogRef<CreateSubgroupModalComponent>
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
