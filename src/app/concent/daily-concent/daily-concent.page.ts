import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { CustomerInfo } from '../../customer/customer-model';
import { DailyConcentSaveRequest } from '../concent-model';
//import { CustomerDataService } from '../../customer/customer-data-service';
import { ConcentDataService } from '../concent-data-service';
import { CustomerUIService } from '../../customer/customer-ui.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-daily-concent',
  templateUrl: './daily-concent.page.html',
  styleUrls: ['./daily-concent.page.scss'],
})
export class DailyConcentPage implements OnInit {

  public customerInfo = new CustomerInfo();
  public dailyConcentSaveRequest = new DailyConcentSaveRequest();
  private ngUnsubscription = new Subject();
  public title: string;

  public myself: boolean;
  public customerId: number;

  public preview_url: string;
  private baseUrl: string;
  
  constructor(
    private concentDataService: ConcentDataService,
    //private customerDataService: CustomerDataService,
    private customerUIService: CustomerUIService,
    private router: Router
  ) {
    this.title = "Daily Concent Form";
    this.myself = true;
    this.dailyConcentSaveRequest.ConsentDatetime = moment().format('YYYY-MM-DD');

    this.baseUrl = environment.host;

    //this.preview_url = "https://www.sj.vic.edu.au/wp-content/uploads/2015/05/signature-Img.jpg";
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
        this.customerInfo.SignatureURL = this.baseUrl + "UserImages/Signatures/" + this.customerInfo.SignatureURL + ".jpeg"
        console.log("customerInfo", this.customerInfo);
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

  onAddNewDailyConcent() {

    this.dailyConcentSaveRequest.RegNo = this.customerInfo.RegNo;

    this.concentDataService
      .addNewDailyConcent(this.dailyConcentSaveRequest)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((value: boolean) => {
        if (value) {
          console.log(value);
          this.router.navigateByUrl('menu/home');
        }
      }, (error: any) => {
        console.log(error);
      })
  }

}
