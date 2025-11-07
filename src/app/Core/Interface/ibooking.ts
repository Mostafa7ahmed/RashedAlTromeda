export interface IBooking {
  id: number
  userId: number
  userName: string
  photoUrl: string
  status: number
  type: number
  createOn: string
  scheduleId: number
  completeOn: any
  totalAmount: number
}
export interface BookApproved {
  userId: number
  userName: string
  photo: string
  bookings: Booking[]
}

export interface Booking {
  id: number
  createOn: string
  services: Service[]
}

export interface Service {
  id: number
  name: string
}
