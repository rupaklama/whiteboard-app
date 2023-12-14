import { createSlice } from "@reduxjs/toolkit";

const whiteboardSlice = createSlice({
  name: "whiteboard",
  initialState: {
    tool: null,
    elements: [],
  },

  reducers: {
    setToolType: (state, action) => {
      state.tool = action.payload;
    },
    updateElement: (state, action) => {
      const { id } = action.payload;
      const index = state.elements.findIndex(el => el.id === id);

      // new element
      if (index === -1 && action.payload.id !== undefined) {
        state.elements.push(action.payload);
      } else {
        // update element
      }
    },
  },
});

export const { setToolType, updateElement } = whiteboardSlice.actions;
export default whiteboardSlice.reducer;
