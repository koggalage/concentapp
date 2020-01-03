import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerInfo } from '../customer-model';
import { CustomerDataService } from '../customer-data-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Router } from '@angular/router';
import { SignatureUiService } from '../../signature/signature-ui.service'

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.page.html',
  styleUrls: ['./customer-registration.page.scss'],
})
export class CustomerRegistrationPage implements OnInit {
  @ViewChild(SignaturePad, { static: false }) public signaturePad: SignaturePad;

  public signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };

  public customerInfo = new CustomerInfo();
  private ngUnsubscription = new Subject();

  public signatureImage: string;
  public title: string;

  constructor(
    private customerDataService: CustomerDataService,
    private router: Router,
    private signatureUiService: SignatureUiService) {
    this.title = "Initial Assesment Form";
  }

  ngOnInit() {
  }

  onAddNewCustomer() {

    this.customerInfo.SignatureURL = this.signaturePad.toDataURL();

    console.log('url', this.customerInfo.SignatureURL);

    this.customerDataService
      .addNewCustomer(this.customerInfo)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((value: boolean) => {
        if (value) {
          console.log(value);
          this.router.navigateByUrl('menu/init-concent');
        }
      }, (error: any) => {
        console.log(error);
      })
  }

  // private getSignature() {
  //   this.signatureUiService
  //     .getSignatureUrl()
  //     .pipe(takeUntil(this.ngUnsubscription))
  //     .subscribe((signatureUrl: string) => {

  //     });
  // }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());

    this.customerInfo.SignatureURL = this.signaturePad.toDataURL();
  }

  drawClear() {
    this.signaturePad.clear();
  }

}
