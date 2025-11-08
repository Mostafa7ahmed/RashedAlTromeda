export interface IOrganization {
  id: number
  description: any
  centerCount: number
  user: User
}

export interface User {
  id: number
  name: string
  phone: string
  address: string
  photoUrl: string
  latitude: number
  longitude: number
}


export interface IUser {
  id: number;
  name: string;
  phone: string;
  address: string | null;
  photoUrl: string;
  latitude: number;
  longitude: number;
}

export interface ICenter {
  id: number;
  type: string | null;
  user: IUser;
}

export interface IOrganizationResult {
  id: number;
  description: string | null;
  centerCount: number;
  user: IUser;
}

export interface IOrganizationResponse {
  result: IOrganizationResult;
  centers: ICenter[];
}