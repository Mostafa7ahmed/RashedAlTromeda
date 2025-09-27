export interface Customer {
    name: string;
    phoneNumber: string;
    password: string;
    confirmedPassword: string;
}

export interface IProfileCompletion {
    address: string;
    latitude: number;
    longitude: number;
    photoUrl: string;
}
