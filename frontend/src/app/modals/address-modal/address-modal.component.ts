import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ZipcodeService } from 'src/app/services/rests/zipcode.service';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss']
})
export class AddressModalComponent implements OnInit {
  
  formGroup = this.createFormGroup()
  typingTimeout: any = null

  constructor(
    private readonly dialog: MatDialogRef<AddressModalComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly zipService: ZipcodeService
  ) { }

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
    return this.formBuilder.group({
      zip: [''],
      street: ['', [Validators.required]],
      district: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      reference: [''],
      complement: ['']
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
