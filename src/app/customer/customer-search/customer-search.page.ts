import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerSearchRequest, CustomerInfo } from '../customer-model';
import { CustomerDataService } from '../customer-data-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerUIService } from '../customer-ui.service';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.page.html',
  styleUrls: ['./customer-search.page.scss'],
})
export class CustomerSearchPage implements OnInit {

  customers: any[];

  public isNotRegistered: boolean = false;

  public customerInfo: CustomerInfo[];
  public customerSearchRequest = new CustomerSearchRequest();
  private ngUnsubscription = new Subject();
  public title: string;
  private selectedRegNo: number;

  constructor(
    private customerDataService: CustomerDataService,
    private customerUIService: CustomerUIService,
    private router: Router
  ) {
    this.title = "Customer Search";
  }

  ngOnInit() {
  }

  seachCustomers() {
    this.customerDataService
      .searchCustomers(this.customerSearchRequest)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((customers: CustomerInfo[]) => {
        this.customerInfo = customers;
        this.isNotRegistered = (this.customerInfo == null);
      })
  }

  redirectCustomer(customer: CustomerInfo) {
    this.selectedRegNo = parseInt(customer.RegNo.replace(/^.{2}/g, ''));
    this.customerUIService.setCustomerId(this.selectedRegNo);
    this.customerUIService.setSelectedCustomer(customer);

    if (customer.Fname == null ||
      customer.Lname == null ||
      customer.DoB == null ||
      customer.MobileNo == null ||
      customer.Email == null) {
      this.router.navigateByUrl('menu/customer-info');
    } else if (!customer.IsFilledInitConcern) {
      this.router.navigateByUrl('menu/init-concent');
    } else {
      this.router.navigateByUrl('menu/daily-concent');
    }
  }
}
