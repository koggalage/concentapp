import { Injectable } from '@angular/core';
import { BaseDataService } from '../core/app-service/base-data.service';
import { Observable } from 'rxjs';
import { CustomerInfo, CustomerSearchRequest } from './customer-model';

@Injectable()
export class CustomerDataService {

  private apiCustomerUrl = 'Customers';

  constructor(
    private baseDataService: BaseDataService
  ) { }

  public addNewCustomer(body: CustomerInfo): Observable<boolean> {
    return this.baseDataService.makePostCall(`${this.apiCustomerUrl}/${'register'}`, body)
  }

  public searchCustomers(body: CustomerSearchRequest): Observable<CustomerInfo[]> {
    return this.baseDataService.makePostCall(`${this.apiCustomerUrl}/${'search'}`, body);
  }

  public getCustomerInfo(creditorId: number): Observable<CustomerInfo> {
    return this.baseDataService.makeGetCall(`${this.apiCustomerUrl}/${'customers'}/${creditorId}/${'settings'}`)
  }

  public updateCustomer(body: CustomerInfo): Observable<boolean> {
    return this.baseDataService.makePostCall(`${this.apiCustomerUrl}/${'update'}`, body)
  }

}
