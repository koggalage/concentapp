import { Injectable } from '@angular/core';
import { BaseDataService } from '../core/app-service/base-data.service';
import { Observable } from 'rxjs';
import { TreatmentHistory, DailyUpdateSaveRequest } from './treatment-model';

@Injectable()
export class TreatmentDataService {

  private apiTreatmentUrl = 'Treatment';

  constructor(
    private baseDataService: BaseDataService
  ) { }


  public getTreatmentHistory(customerId: number): Observable<TreatmentHistory> {
    return this.baseDataService.makeGetCall(`${this.apiTreatmentUrl}/${'treatments'}/${customerId}/${'history'}`)
  }

  public addNewDailyUpdate(body: DailyUpdateSaveRequest): Observable<boolean> {
    return this.baseDataService.makePostCall(`${this.apiTreatmentUrl}/${'save'}`, body)
  }

}
