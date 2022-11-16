import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupsService } from 'src/app/services/rests/groups.service';
import { Collection, CollectionsService } from 'src/app/services/rests/collections.service';
import { SubGroup, SubGroups, SubGroupsService } from 'src/app/services/rests/sub-groups.service';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-create-product-modal',
  templateUrl: './create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.scss']
})
export class CreateProductModalComponent implements OnInit {

  groups$ = this.groups()
  subgroups: SubGroups = []
  collections$ = this.collections()

  data: Product = {
    description: '',
    price: 0,
    group: '',
    subgroup: '',    
    collection: ''    
  };

  // collections: Collection[] = [{ description: 'qwer'}, { description: 'qwer'}]
  formGroup: any = null;

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
      description: [this.data.description, [ Validators.required ]],
      price: [this.data.price, [ Validators.required ]],
      group: [this.data.group, [ Validators.required ]],
      subgroup: [this.data.subgroup, [ Validators.required ]],
      collection: [this.data.collection, [ Validators.required ]]
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
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private raw_data: Product
  ) {
    if (this.raw_data) {
      this.data = Object.assign({}, this.data, raw_data)
      console.log('new_data', this.data)
    }
    this.formGroup = this.createFormGroup()
  }

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
