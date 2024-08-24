import { Component, OnDestroy } from '@angular/core';
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
import { MerchApiCallsService } from '../../services/api-calls/merch-api-calls.service';
import { Subject, takeUntil } from 'rxjs';

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
export class NewMerchComponent implements OnDestroy {
  //A single destroyObservable$ subject type is created.
  private destroyObservable$ = new Subject<void>();

  constructor(
    private messageService: MessageService,
    private merchService: MerchApiCallsService
  ) {}

  price!: number;
  uploadedFiles: any[] = [];
  image!: string;
  visible: boolean = false;
  variants: any[] = [];

  newMerchForm = new FormGroup({
    merchName: new FormControl(''),
    merchPrice: new FormControl(0),
  });

  variantForm = new FormGroup({
    color: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
  });

  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      //this.image = file.webkitRelativePath;
      console.log('push image', file);
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
    //--- is this a service?
    let formVariantData = this.variantForm.value;
    let newVariantData = {
      id: this.variants.length + 1,
      ...formVariantData,
    };
    
    //add data fron popupdialog to variants[]
    this.variants.push(newVariantData);
    console.log(newVariantData);
    //---
    this.hideDialog();
  }

  submitNewMerch() {
    // combine αλλ data from the form into one Object 
    let newMerchData = {
      ...this.newMerchForm.value,
      merchVariants: this.variants,
    };
    console.log(newMerchData);

    /**
     * const AddMerchObservable$ use takeUntil(this.destroyObservable$)
     * to unsubscribe when the destroyObservable$ subject emits a value...
     * ...this happens technically on ngOnDestry() method
     */
    const addMerchObservable$ = this.merchService.addNewMerch(newMerchData).pipe(takeUntil(this.destroyObservable$));
    //subscribe to addMerchObservable to handle errors and/or to see the respond
    addMerchObservable$.subscribe((res) => {
      console.log('Response: ', res);
      console.log("Response status:", res.status);
    });
  }

  /**
   * The ngOnDestroy method unsubscribes
   * from AddMerchObservable(all that is subscribed to Sublect-observable via takeUntil)
   * by calling this.destroyObservable$.next().
   */
  ngOnDestroy(): void {
    //emit a next value from destroyObservable(Subject), so takeUntill(this.destroyObservable$) triggered and stop the addMerchObservable
    this.destroyObservable$.next();
    //unsubscribe-completes-closes the Subject-observable
    this.destroyObservable$.complete();
  }
}