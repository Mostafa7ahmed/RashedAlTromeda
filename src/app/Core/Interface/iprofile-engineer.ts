export interface IProfileEngineer {
  profileId: number
  summary: any
  startYear: number
  identityPhotoUrl: string
  services: any[]
  countryId: number
  planId: number
  userDto: UserDto
  availability: Availability
}

export interface UserDto {
  id: number
  name: string
  phone: string
  address: any
  photoUrl: string
  latitude: number
  longitude: number
}

export interface Availability {
  id: number
  isAvailable: boolean
}
export interface UpdateProfileEngineer {
  name: string
  address: string
  photoUrl: string
  latitude: number
  longitude: number
  summary: string
  startYear: number
  identityPhotoUrl: string
  services: Service[]
  countryId: number
  planId: number
}

export interface Service {
  id: number
  price: number
}
