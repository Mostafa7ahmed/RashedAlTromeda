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
export interface IBookingResponse {
  success: boolean;
  statusCode: number;
  message: string | null;
  result: IBookingDetail;
}

export interface IBookingDetail {
  id: number;
  user: IUser;
  services: IService[];
  date: string;
  address: string;
  latitude: number;
  longitude: number;
  engineerId: number;
  customerId: number;
  totalAmount: number;
  totalPoint: number;
}

export interface IUser {
  id: number;
  name: string;
  phone: string;
  address: string;
  photoUrl: string;
  latitude: number;
  longitude: number;
}

export interface IService {
  id: number;
  name: string;
  quoteId: number;
  price: number;
  point: number;
}