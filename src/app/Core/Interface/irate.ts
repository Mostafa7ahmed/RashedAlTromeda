export interface IRate {
  craator: Craator
  id: number
  engineerId: number
  value: number
  comment: string
  createdOn: string
}

export interface Craator {
  id?: number
  name: string
  phone: string
  address: string
  photoUrl: string
  latitude: number
  longitude: number
}
export interface IAddRate {
  engineerId: number;
  engineerUserId: number;
  value: number;
  comment: string;
}
