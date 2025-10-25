export interface IProfileCustomer {
  profileId: number
  totalPoint: number
  userDto: UserDto
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
