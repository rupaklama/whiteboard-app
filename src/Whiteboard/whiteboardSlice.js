import { createSlice } from "@reduxjs/toolkit";

const whiteboardSlice = createSlice({
  name: "whiteboard",
  initialState: {
    tool: null,
  },

  reducers: {
    setToolType: (state, action) => {
      state.tool = action.payload;
    },
  },
});

export const { setToolType } = whiteboardSlice.actions;
export default whiteboardSlice.reducer;
