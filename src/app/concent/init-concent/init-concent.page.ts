import { Component, OnInit } from '@angular/core';
import { CustomerDataService } from '../../customer/customer-data-service';
import { ConcentDataService } from '../concent-data-service';
import { Subject } from 'rxjs';
import { CustomerInfo } from 'src/app/customer/customer-model';
import { takeUntil } from 'rxjs/operators';
import { InitConcentSaveRequest } from '../concent-model';
import { CustomerUIService } from '../../customer/customer-ui.service';
//import { ConstantPool } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init-concent',
  templateUrl: './init-concent.page.html',
  styleUrls: ['./init-concent.page.scss'],
})
export class InitConcentPage implements OnInit {

  public title: string;
  public customerId: number;
  public customerInfo = new CustomerInfo();
  private ngUnsubscription = new Subject();
  public initConcentSaveRequest = new InitConcentSaveRequest();
  public RegNo: string;

  constructor(
    private concentDataService: ConcentDataService,
    private customerUIService: CustomerUIService,
    private router: Router
  ) {
    this.title = "Initial Assesment Form";
  }

  ngOnInit() {
    this.getCustomerInfo();
  }

  private getCustomerInfo() {
    this.customerUIService
      .getSelectedCustomer()
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((customerInfoResponse: CustomerInfo) => {
        this.customerInfo = customerInfoResponse;
        //console.log("customerInfo", this.customerInfo);
      });
  }

  // getCustomerInfo(customerId: number) {
  //   this.customerDataService
  //     .getCustomerInfo(this.customerId)
  //     .pipe(takeUntil(this.ngUnsubscription))
  //     .subscribe((customerInfoResponse: CustomerInfo) => {
  //       this.customerInfo = customerInfoResponse;
  //     });
  // }

  onAddNewInitConcent() {
    this.initConcentSaveRequest.RegNo = this.customerInfo.RegNo;

    this.concentDataService
      .addNewInitConcent(this.initConcentSaveRequest)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((value: boolean) => {
        if (value) {
          console.log(value);
          this.router.navigateByUrl('menu/daily-concent');
        }
      }, (error: any) => {
        console.log(error);
      })
  }

}
