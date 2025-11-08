export interface IComplaint {
  id: number
  title: string
  description: string
  status: number
  type: number
  voiceNoteUrl: string
  fileUrls: string[]
  photoUrls: string[]
  creatorId: number
  orderId: number
  userId: number
  categoryId: number
  createdOn: string
  updatedOn: any
}

export interface IComplaintWithAudio extends IComplaint {
  audio?: HTMLAudioElement | null;
  isPlaying?: boolean;
  progress?: number;
  currentTime?: number;
}

export interface IAddComplaint {
  title: string
  description: string
  orderId: number
  userId: number
  voiceNoteUrl: string
  fileUrls: string[]
  photoUrls: string[]
}

export interface ServiceItem {
  id: number;
  name: string;
}

export interface Booking {
  id: number;
  createOn: string;
  services: { id: number; name: string }[];
}

export interface BookingUser {
  userId: number;
  userName: string;
  photo: string;
  bookings: Booking[];
}