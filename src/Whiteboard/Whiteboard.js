import { useRef, useLayoutEffect, useState } from "react";
import rough from "roughjs";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import Menu from "./Menu";
import { actions, toolTypes } from "../constants";
import {
  createElement,
  updateCurrentElement,
  drawElement,
  adjustmentRequired,
  adjustElementCoordinates,
} from "./utils";
import { updateElement as updateElementInStore } from "./whiteboardSlice";

let selectedElement;
console.log("selectedElement", selectedElement);

const setSelectedElement = el => {
  selectedElement = el;
};

const Whiteboard = () => {
  const selectedToolType = useSelector(state => state.whiteboard.tool);
  const elements = useSelector(state => state.whiteboard.elements);

  const [action, setAction] = useState("");

  const dispatch = useDispatch();

  // useRef is similar to dom query selector
  const canvasRef = useRef();

  // note: Use this to read layout after the DOM renders and synchronously re-render
  useLayoutEffect(() => {
    const canvasEl = canvasRef.current;

    const ctx = canvasEl.getContext("2d");
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    const roughCanvas = rough.canvas(canvasEl);
    // rc.rectangle(10, 10, 200, 200); // x, y, width, height
    elements.forEach(element => {
      drawElement({ roughCanvas, context: ctx, element });
    });
  }, [elements]);

  const handleMouseDown = e => {
    // mouse coordinates
    const { clientX, clientY } = e;
    // console.log(clientX, clientY);
    console.log(selectedToolType);

    if (selectedToolType === toolTypes.RECTANGLE) {
      setAction(actions.DRAWING);
    }

    // note: x1 & y1 is the starting point, y1 & y2 is the finishing point
    const element = createElement({
      x1: clientX,
      y1: clientY,

      x2: clientX, // same on start
      y2: clientY,
      toolType: selectedToolType,
      id: uuid(),
    });

    setSelectedElement(element);
    dispatch(updateElementInStore(element));
  };

  const handleMouseUp = () => {
    // note: adjust coordinates when drawing from the bottom up
    const selectedElementIndex = elements.findIndex(el => el.id === selectedElement.id);

    if (selectedElementIndex !== -1) {
      if (action === actions.DRAWING) {
        if (adjustmentRequired(elements[selectedElementIndex].type)) {
          console.log("resizing is active now!");
          const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[selectedElementIndex]);

          updateCurrentElement(
            {
              id: selectedElement.id,
              index: selectedElementIndex,
              x1,
              x2,
              y1,
              y2,
              type: elements[selectedElementIndex].type,
            },
            elements
          );
        }
      }
    }

    setAction(null);
    setSelectedElement(null);
  };

  const handleMouseMove = event => {
    const { clientX, clientY } = event;

    if (action === actions.DRAWING) {
      // find index of selected element
      const index = elements.findIndex(el => el.id === selectedElement.id);

      if (index !== -1) {
        updateCurrentElement(
          {
            index,
            id: elements[index].id,
            x1: elements[index].x1,
            y1: elements[index].y1,
            x2: clientX,
            y2: clientY,
            type: elements[index].type,
          },
          elements
        );
      }
    }
  };

  return (
    <>
      <Menu />
      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </>
  );
};
export default Whiteboard;
