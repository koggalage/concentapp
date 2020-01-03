import { Component, OnInit } from '@angular/core';
import { TreatmentHistory } from '../treatment-model';
import { TreatmentDataService } from '../treatment-data-service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-treatment-history',
  templateUrl: './treatment-history.page.html',
  styleUrls: ['./treatment-history.page.scss'],
})
export class TreatmentHistoryPage implements OnInit {

  public treatmentHistory = new TreatmentHistory();
  public customerId: number;
  private ngUnsubscription = new Subject();

  constructor(
    private treatmentDataService: TreatmentDataService
  ) { }

  ngOnInit() {
  }

  getCustomerInfo(customerId: number) {
    this.treatmentDataService
      .getTreatmentHistory(this.customerId)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((history: TreatmentHistory) => {
        this.treatmentHistory = history;
      });
  }

}
