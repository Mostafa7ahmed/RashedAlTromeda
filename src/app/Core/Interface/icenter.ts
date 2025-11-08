export interface ICenter {
  id: number
  type: any
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
