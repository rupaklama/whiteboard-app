import rough from "roughjs/bundled/rough.esm";
import { toolTypes } from "../../constants";

const generator = rough.generator();

// note: x1 & y1 is the starting point, y1 & y2 is the finishing point
const generateRectangle = ({ x1, y1, x2, y2 }) => {
  // const rc = rough.canvas(canvasEl);
  // rc.rectangle(10, 10, 200, 200);
  return generator.rectangle(x1, y1, x2 - x1, y2 - y1); // x, y, width, height
};

export const createElement = ({ x1, y1, x2, y2, toolType, id }) => {
  let roughElement;

  switch (toolType) {
    case toolTypes.RECTANGLE:
      roughElement = generateRectangle({ x1, y1, x2, y2 });
      return {
        id: id,
        roughElement,
        type: toolType,
        x1,
        y1,
        x2,
        y2,
      };

    default:
      return Error("Something went wrong when creating element");
  }
};
