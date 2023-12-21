import { createElement } from ".";
import { toolTypes } from "../../constants";
import { emitElementUpdate } from "../../socketClient/socketClient";
import { store } from "../../store/store";
import { setElements } from "../whiteboardSlice";

export const updateCurrentElement = ({ id, x1, x2, y1, y2, type, index }, elements) => {
  const elementsCopy = [...elements];

  switch (type) {
    case toolTypes.RECTANGLE:
      const updatedElement = createElement({
        id,
        x1,
        y1,
        x2,
        y2,
        toolType: type,
      });

      elementsCopy[index] = updatedElement;

      store.dispatch(setElements(elementsCopy));

      // note: Send current updated element to the Socket Server to
      // notify client to update redux store with latest data to display for all users
      emitElementUpdate(updatedElement);
      break;
    default:
      return Error("Something went wrong when updating element");
  }
};
