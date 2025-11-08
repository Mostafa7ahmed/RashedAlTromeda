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
