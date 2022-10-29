import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/entities/product';
import { MatDialogRef } from '@angular/material/dialog';
import { Group, GroupsService } from 'src/app/services/rests/groups.service';
import { Collection, CollectionsService } from 'src/app/services/rests/collections.service';
import { SubGroup, SubGroupsService } from 'src/app/services/rests/sub-groups.service';

@Component({
  selector: 'app-create-product-modal',
  templateUrl: './create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.scss']
})
export class CreateProductModalComponent implements OnInit {

  groups: Group[] = []
  subgroups: SubGroup[] = []
  collections: Collection[] = [{ description: 'qwer'}, { description: 'qwer'}]
  data: Product = {
    description: '',
    price: 0,
    group: '',
    subgroup: '',
    collection: ''

  }

  async loadSubgroups(){
    this.subgroups = await this.subgroupsService.load({ description: this.data.group })
  }

  constructor(
    private readonly dialog: MatDialogRef<CreateProductModalComponent>,
    private readonly groupsService: GroupsService,
    private readonly subgroupsService: SubGroupsService,
    private readonly collectionService: CollectionsService
  ) {
    this.groupsService.groups.subscribe(groups => this.groups = groups)
    this.groupsService.loadGroups()
    this.collectionService.collections.subscribe(collections => this.collections = collections)
    this.collectionService.load()
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
