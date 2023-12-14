import { configureStore } from "@reduxjs/toolkit";
import whiteboardSliceReducer from "../Whiteboard/whiteboardSlice";

export const store = configureStore({
  reducer: {
    whiteboard: whiteboardSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // Class is not fully serializable, ignore checks on following to avoid issues
      serializableCheck: {
        ignoreActions: ["whiteboard/setElements"],
        ignoredPaths: ["whiteboard.elements"],
      },
    }),
});
