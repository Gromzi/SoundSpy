import { IPredictedGenres } from './IPredictedGenres'

export interface IPredictionState {
  currentPrediction: IPredictedGenres | null
  refreshAfterDelete: number

  setCurrentPrediction: (currentPrediction: IPredictedGenres) => void
  setRefreshAfterDelete: (refreshAfterDelete: number) => void
}
