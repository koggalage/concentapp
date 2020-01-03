export class DailyUpdateSaveRequest {
    Date: Date;
    Problem: string;
    DoctorNote: string;
    TreatmentImageURLs = new Array<any>();
    RegNo: string;
}

export class TreatmentHistory {
    RegNo: string;
    FullName: string;
    Mobile: string;
}