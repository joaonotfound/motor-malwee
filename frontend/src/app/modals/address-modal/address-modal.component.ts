import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/models';
import { ZipcodeService } from 'src/app/services/rests/zipcode.service';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss']
})
export class AddressModalComponent implements OnInit {
  
  formGroup: any;
  data: Address = {
    customer: 0,
    street: '',
    city: '',
    district: '',
    state: '',
    country: '',
    zip: '',
    reference: '',
    complement: ''

  };

  constructor(
    private readonly dialog: MatDialogRef<AddressModalComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly zipService: ZipcodeService,
    @Inject(MAT_DIALOG_DATA) raw_data: Address
  ) {
    if(raw_data){
      this.data = Object.assign({}, this.data, raw_data)
    }
    this.formGroup = this.createFormGroup()
  }

  ngOnInit(): void {

  }

  get zip(){
    return this.formGroup.get('zip')?.value
  }

  async searchZip(){
   if(this.zip?.length == 8){   
      const address = await this.zipService.load(this.zip!)
      this.formGroup.get('street')?.setValue(address?.street!)    
      this.formGroup.get('district')?.setValue(address?.district!)    
      this.formGroup.get('city')?.setValue(address?.city!)    
      this.formGroup.get('state')?.setValue(address?.state!)    
      this.formGroup.get('country')?.setValue(address?.country!)
  }
  }   

  get description(){
    return this.formGroup.get('description')
  }

  createFormGroup(){
    console.log(this.data)
    return this.formBuilder.group({
      zip: [this.data.zip, [ Validators.minLength(8), Validators.maxLength(8)]],
      street: [this.data.street, [Validators.required]],
      district: [this.data.district, [Validators.required]],
      city: [this.data.city, [Validators.required]],
      state: [this.data.state, [Validators.required]],
      country: [this.data.country, [Validators.required]],
      reference: [this.data.reference],
      complement: [this.data.complement]
    })
  }

  cancel(){
    this.dialog.close()
  }

  create(){
    const response = {
      zip: this.zip!,
      street: this.formGroup.get('street')?.value!,
      district: this.formGroup.get('district')?.value!,
      city: this.formGroup.get('city')?.value!,
      state: this.formGroup.get('state')?.value!,
      country: this.formGroup.get('country')?.value!,
      reference: this.formGroup.get('reference')?.value!,
      complement: this.formGroup.get('complement')?.value!
    }
    this.dialog.close(response)
  }

}
