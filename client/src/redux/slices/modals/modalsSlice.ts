import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
   noteCommentsVisible: boolean;
}

const initialState: CounterState = {
   noteCommentsVisible: false,
};

export const counterSlice = createSlice({
   name: "modals",
   initialState,
   reducers: {
      setNoteCommentsVisible: (state, { payload }: PayloadAction<boolean> ) => {
         state.noteCommentsVisible = payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setNoteCommentsVisible } = counterSlice.actions;

export default counterSlice.reducer;
