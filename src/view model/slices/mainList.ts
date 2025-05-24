import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MainListState {
  items: any[];
}

const initialState: MainListState = {
  items: [],
}

export const mainListSlice = createSlice({
  name: 'mainList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
    },
  },
})

export const { addItem } = mainListSlice.actions

export default mainListSlice.reducer