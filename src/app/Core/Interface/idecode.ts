export interface IDecode {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string
  Name: string
  PhotoUrl: string
  Phone: string
  role: string
  latitude: string
  longitude: string
  ProfileId: string
  exp: number
  iss: string
  aud: string
}
export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmedNewPassword: string;
}