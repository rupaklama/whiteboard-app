import { toolTypes } from "../../constants";

export const drawElement = ({ roughCanvas, context, element }) => {
  switch (element.type) {
    case toolTypes.RECTANGLE:
      return roughCanvas.draw(element.roughElement);
    default:
      return Error("Something went wrong when drawing element");
  }
};
