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
