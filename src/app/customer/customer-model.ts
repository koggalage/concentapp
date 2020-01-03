export class CustomerInfo {
    RegNo: string;
    Fname: string;
    Lname: string;
    Address: string;
    MobileNo: string;
    HomePhone: string;
    Email: string;
    Gender: string;
    Age: number;
    DoB: string;
    Profession: string;
    FullName: string;
    LoyaltyCardNo: string;
    IsFilledInitConcern: boolean;
    SignatureURL: string;
}

export class CustomerSearchRequest {
    RegNo: string;
    CustomerName: string;
    MobileNo: string;
}