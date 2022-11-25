import { Component, OnInit, Optional, Inject } from '@angular/core';
import { SubGroup } from 'src/app/services/rests/sub-groups.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-subgroup-modal',
  templateUrl: './subgroup-modal.component.html',
  styleUrls: ['./subgroup-modal.component.scss']
})
export class SubgroupModalComponent implements OnInit {

  data: SubGroup= {
    description: ''    
  }

  constructor(
    private readonly dialog: MatDialogRef<SubgroupModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public readonly raw_data: SubGroup
  ) {
    if(raw_data){
      this.data = {...raw_data}
    }
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
