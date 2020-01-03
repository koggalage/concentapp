import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { File } from '@ionic-native/file/ngx';
import { CustomerInfo, CustomerSearchRequest } from '../../customer/customer-model';
import { takeUntil } from 'rxjs/operators';
import { CustomerDataService } from '../../customer/customer-data-service';
import { TreatmentDataService } from '../treatment-data-service';
import { Subject } from 'rxjs';
import { DailyUpdateSaveRequest } from '../../treatment/treatment-model';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import * as moment from 'moment';
import { CustomerUIService } from '../../customer/customer-ui.service';

@Component({
  selector: 'app-daily-update',
  templateUrl: './daily-update.page.html',
  styleUrls: ['./daily-update.page.scss'],
})
export class DailyUpdatePage implements OnInit {

  public customerInfo = new CustomerInfo();
  public dailyUpdateSaveRequest = new DailyUpdateSaveRequest();

  public photos: any = [];

  //public tempBase64: string;

  private ngUnsubscription = new Subject();
  constructor(
    public camera: Camera,
    private transfer: FileTransfer,
    public file: File,
    private customerDataService: CustomerDataService,
    private customerUIService: CustomerUIService,
    private treatmentDataService: TreatmentDataService) { }

  //temp
  public customerSearchRequest = new CustomerSearchRequest();

  ngOnInit() {
    this.getCustomerInfo();
  }

  private getCustomerInfo() {
    this.customerUIService
      .getSelectedCustomer()
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((customerInfoResponse: CustomerInfo) => {
        this.customerInfo = customerInfoResponse;
        this.dailyUpdateSaveRequest.RegNo = this.customerInfo.RegNo;
        console.log("customerInfo", this.customerInfo);
      });
  }

  TakePhotos() {

    const options: CameraOptions = {
      quality: 100,
      //destinationType: this.camera.DestinationType.FILE_URI,
      //encodingType: this.camera.EncodingType.JPEG,
      //mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture().then((imageData) => {
      let fileName = imageData.substring(imageData.lastIndexOf('/') + 1);
      let path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
      this.file.readAsDataURL(path, fileName).then((base64data) => {
        this.dailyUpdateSaveRequest.TreatmentImageURLs.push(base64data);
      })
    }, (err) => {
      this.customerSearchRequest.CustomerName = err;
      this.customerDataService
        .searchCustomers(this.customerSearchRequest)
        .pipe(takeUntil(this.ngUnsubscription))
        .subscribe((customers: CustomerInfo[]) => {
          console.log(customers);
        })
    });
  }

  onAddNewDailyUpdate() {
    this.dailyUpdateSaveRequest.Date = new Date((moment().format('YYYY-MM-DD')));

    this.treatmentDataService
      .addNewDailyUpdate(this.dailyUpdateSaveRequest)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((value: boolean) => {
        if (value) {
          console.log(value);
          //this.router.navigateByUrl('menu/init-concent');
        }
      }, (error: any) => {
        console.log(error);
      })
  }

}
