import { configureStore } from '@reduxjs/toolkit';
import mainListReducer from './slices/mainList';

export const store = configureStore({
  reducer: {
    mainList: mainListReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store object itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {entries: EntriesState}
export type AppDispatch = typeof store.dispatch

