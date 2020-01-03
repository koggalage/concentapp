export class DailyConcentSaveRequest {
    RegNo: string;
    ConsentDatetime: string;
    Nic: string;
    NameOfTheTreatment: string;
    PreviousListOfTreatment: string;
    ExplainedBy: string;
    ConsentBy: string;
    Relationship: string;
    IsClientSigned: boolean;
    TherapistName: string;
    IsTherapistSigned: boolean;
    DoctorName: string;
    IsDoctorSinged: boolean;
    RelativeName: string;

}

export class InitConcentSaveRequest {
    RegNo: string;
    Date: string;
    IsDiabetes: boolean;
    IsHypertension: boolean;
    IsHeartDisease: boolean;
    IsAsthma: boolean;
    IsSinusitis: boolean;
    IsHyperlipidemia: boolean;
    IsOther: boolean;
    IsSurgical: boolean;
    IsMarried: string;
    IsSmoker: string;
    IsAlcoholic: string;
    IsAllergies: string;
    IsMenstrualAbnormalities: string;
    OtherDiseases: string;
    SurgicalHistory: string;
    CurrentMedication: string;
    KnownAllergies: string;
    MenstrualAbnormalities: string;
    CurrentyUsedProducts: string;
    AnySkinTreatments: string;
    PreviousSkinTreatments: string;
}