import { IPredictedGenres } from './IPredictedGenres'

export interface IPredictionResponse {
  id: number
  user_id?: number
  result: IPredictedGenres
  created_at: string
  updated_at: string
}
