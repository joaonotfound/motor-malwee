import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GroupsService } from 'src/app/services/rests/groups.service';
import { Collection, CollectionsService } from 'src/app/services/rests/collections.service';
import { SubGroup, SubGroups, SubGroupsService } from 'src/app/services/rests/sub-groups.service';

@Component({
  selector: 'app-create-product-modal',
  templateUrl: './create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.scss']
})
export class CreateProductModalComponent implements OnInit {

  groups$ = this.groups()
  subgroups: SubGroups = []
  collections$ = this.collections()

  // collections: Collection[] = [{ description: 'qwer'}, { description: 'qwer'}]
  formGroup = this.createFormGroup()

  get description(){
    return this.formGroup.get('description')
  }
  get price(){
    return this.formGroup.get('price')
  }
  get group(){
    return this.formGroup.get('group')
  }
  get subgroup(){
    return this.formGroup.get('subgroup')
  }
  get collection(){
    return this.formGroup.get('collection')
  }
  groups(){
    return this.groupsService.groups
  }
  collections(){
    return this.collectionService.collections();
  }

  createFormGroup(){
    return this.formBuilder.group({
      description: ['', [ Validators.required ]],
      price: [0, [ Validators.required ]],
      group: ['', [ Validators.required ]],
      subgroup: ['', [ Validators.required ]],
      collection: ['', [ Validators.required ]]
    })
  }

  async loadSubgroups(){
    this.subgroups = await this.subgroupsService.load({ description: this.group?.value! })
  }

  constructor(
    private readonly dialog: MatDialogRef<CreateProductModalComponent>,
    private readonly groupsService: GroupsService,
    private readonly subgroupsService: SubGroupsService,
    private readonly collectionService: CollectionsService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {    
    // .subscribe(groups => this.groups$ = groups)
    this.groupsService.loadGroups()
    this.collectionService.load()
    this.loadSubgroups()
  }

  cancel(){
    this.dialog.close()
  }

  create(){
    const response = {
      description: this.description?.value,
      price: this.price?.value,
      group: this.group?.value,
      subgroup: this.subgroup?.value,
      collection: this.collection?.value
    }
    this.dialog.close(response)
  }


}
