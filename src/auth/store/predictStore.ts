import { create } from 'zustand'
import { IPredictedGenres } from '../interfaces/prediction/IPredictedGenres'
import { IPredictionState } from '../interfaces/prediction/IPredictionState'

export const usePredictStore = create<IPredictionState>((set) => ({
  currentPrediction: null,

  setCurrentPrediction: (currentPrediction: IPredictedGenres) =>
    set({ currentPrediction }),
}))
