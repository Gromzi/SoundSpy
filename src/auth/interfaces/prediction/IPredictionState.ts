import { IPredictedGenres } from './IPredictedGenres'

export interface IPredictionState {
  currentPrediction: IPredictedGenres | null

  setCurrentPrediction: (currentPrediction: IPredictedGenres) => void
}
