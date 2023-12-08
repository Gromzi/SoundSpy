import { create } from 'zustand'
import { IPredictedGenres } from '../interfaces/prediction/IPredictedGenres'
import { IPredictionState } from '../interfaces/prediction/IPredictionState'

export const usePredictStore = create<IPredictionState>((set) => ({
  currentPrediction: null,
  refreshAfterDelete: 0,

  setCurrentPrediction: (currentPrediction: IPredictedGenres) =>
    set({ currentPrediction }),
  setRefreshAfterDelete: (refreshAfterDelete: number) =>
    set({ refreshAfterDelete }),
}))
