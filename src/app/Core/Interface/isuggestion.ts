export interface ISuggestion {
  id: number
  title: string
  description: string
  viewed: boolean
  voiceNoteUrl: string
  fileUrls: string[]
  photoUrls: string[]
  creatorId: number
  createdOn: string
}
export interface ISuggestionWithAudio extends ISuggestion {
  audio?: HTMLAudioElement | null;
  isPlaying?: boolean;
  progress?: number;
  currentTime?: number;
}
export interface IAddsuggest {
  title: string
  description: string
  voiceNoteUrl?: string
  fileUrls?: string[]
  photoUrls?: string[]
}