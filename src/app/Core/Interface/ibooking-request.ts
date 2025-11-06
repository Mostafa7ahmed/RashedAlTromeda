export interface IBookingRequest {
  engineerId: number;
  engineerUserId: number;
  scheduleId: number;
  services: {
    serviceId: number;
    quote: number;
  }[];
  address: string;
  latitude: number;
  longitude: number;
}