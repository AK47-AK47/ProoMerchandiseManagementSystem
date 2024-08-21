import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule, FileUploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-newmerch',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    InputTextModule,
    FileUploadModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  templateUrl: './newmerch.component.html',
  styleUrl: './newmerch.component.css',
})
export class NewMerchComponent {
  constructor(private messageService: MessageService) {}

  price!: number;
  uploadedFiles: any[] = [];
  visible: boolean = false;
  variants: any[] = [];
  variantForm = new FormGroup({
    color: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  });

  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log('push image');
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  addVariant(event: Event) {
    console.log('sent var data');
    console.log(this.variantForm.value);
    let newVariantData = {...this.variantForm.value, id:this.variants.length+1};
    this.variants.push(newVariantData);
      console.log(newVariantData);
    this.hideDialog();
  }

  submitNewMerch() {
    //add data fron popupdialog to vsriants[]
    console.log('New Merch Added');
  }
}
