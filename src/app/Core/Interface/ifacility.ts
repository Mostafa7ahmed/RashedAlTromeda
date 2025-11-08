export interface IFacility {
  id: number
  name: string
  description: string
  gallaries: Gallary[]
  days: number
  hours: number
  price: number
  type: number
  centerId: number
}

export interface Gallary {
  photo: string
  show: boolean
}

export interface Gallery {
  photo: string;
  show: boolean;
}

export interface AddProdcutFacility {
  name: string;
  description: string;
  gallaries: Gallery[];
  type: number;
  price: number;
}