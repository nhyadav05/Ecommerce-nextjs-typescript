// redux/feature/authSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IAddState {
  card: Number;
}

// Define the initial state using that type
const initialState: IAddState = {
  card: 0,
};

export const essaySlice = createSlice({
  name: "addSlice",
  initialState,
  reducers: {
    // This state is for demo purpose
    setAdd: (state, action: PayloadAction<Number>) => {
      state.card = action.payload;
    },
  },
});
export const { setAdd } = essaySlice.actions;

export default essaySlice.reducer;