export interface IUser {
  id: number;
  name: string;
  phone: string;
  address: string | null;
  photoUrl: string;
  latitude: number;
  longitude: number;
}
export interface UpdataOrganization {
  name: string;
  address: string | null;
  photoUrl: string;
  latitude: number;
  longitude: number;
}
export interface UpdataCenter {
  name: string;
  address: string | null;
  photoUrl: string;
  latitude: number;
  longitude: number;
  type:number
}
export interface IAddCenter {
  name: string;
  phone: string;
  password: string;
  confirmedPassword: string;
  address: string;
  latitude: number;
  longitude: number;
}
export interface IMainOrganization {
  id: number;
  description: string | null;
  centerCount: number;
  user: IUser;
}

export interface ICenter {
  id: number;
  type: string | null;
  user: IUser;
}

export interface IProfileOrganization {
  
    message:string;
    statusCode:number;
    success:boolean;
  result: IMainOrganization;
  centers: ICenter[];
}