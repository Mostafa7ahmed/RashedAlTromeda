export interface ICategory {
  id: number
  photoUrl: string
  name: string
}

export interface IService {
    id: number
  name: string
  description: any
  photourl: string
  point: number
  categoryId: number
  categoryName: string
  engineerCount: number
}
