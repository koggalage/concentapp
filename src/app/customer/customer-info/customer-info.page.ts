import { Component, OnInit } from '@angular/core';
import { CustomerUIService } from '../customer-ui.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CustomerInfo } from '../customer-model';
import { CustomerDataService } from '../customer-data-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.page.html',
  styleUrls: ['./customer-info.page.scss'],
})
export class CustomerInfoPage implements OnInit {

  private ngUnsubscription = new Subject();
  public customerInfo = new CustomerInfo();

  public isFnameNotFilled: boolean = false;
  public isLnameNotFilled: boolean = false;
  public isDoBNotFilled: boolean = false;
  public isMobileNotFilled: boolean = false;
  public isEmailNotFilled: boolean = false;

  constructor(
    private customerUIService: CustomerUIService,
    private customerDataService: CustomerDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCustomerInfo();
  }

  private getCustomerInfo() {
    this.customerUIService
      .getSelectedCustomer()
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((customerInfoResponse: CustomerInfo) => {
        this.customerInfo = customerInfoResponse;
        console.log("customerInfo", this.customerInfo);

        this.isFnameNotFilled = (!this.customerInfo.Fname);
        this.isLnameNotFilled = (!this.customerInfo.Lname);
        this.isDoBNotFilled = (!this.customerInfo.DoB);
        this.isMobileNotFilled = (!this.customerInfo.MobileNo);
        this.isEmailNotFilled = (!this.customerInfo.Email);

      });
  }

  onUpdateCustomer() {

    this.customerDataService
      .updateCustomer(this.customerInfo)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((value: boolean) => {
        if (value) {
          console.log(value);

          if (!this.customerInfo.IsFilledInitConcern) {
            this.router.navigateByUrl('menu/init-concent');
          } else {
            this.router.navigateByUrl('menu/daily-concent');
          }
        }
      }, (error: any) => {
        console.log(error);
      })
  }


}
