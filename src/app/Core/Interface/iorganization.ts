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
