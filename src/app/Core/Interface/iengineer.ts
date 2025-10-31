export interface IEngineer {
  profileId: number
  summary: string
  startYear: number
  countryId: number
  countryName: string
  rate: number
  distance: number
  userDto: UserDto
}



export interface IEngineerProfile {
    profileId: number
  summary: string
  startYear: number
  rate: number
  userDto: UserDto
  services: Service[]
  totalServices: number
}



export interface Service {
  id: number
  name: string
  photoUrl: string
  price: number
}


export interface UserDto {
  id: number
  name: string
  phone: string
  address: string
  photoUrl: string
  latitude: number
  longitude: number
}