import { useRef, useLayoutEffect, useState } from "react";
import rough from "roughjs";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import Menu from "./Menu";
import { actions, toolTypes } from "../constants";
import { createElement } from "./utils";
import { updateElement } from "./whiteboardSlice";

let selectedElement;
console.log("selectedElement", selectedElement);

const setSelectedElement = el => {
  selectedElement = el;
};

const Whiteboard = () => {
  const selectedToolType = useSelector(state => state.whiteboard.tool);

  const [action, setAction] = useState("");
  const dispatch = useDispatch();

  // useRef is similar to dom query selector
  const canvasRef = useRef();

  // note: Use this to read layout after the DOM renders and synchronously re-render
  useLayoutEffect(() => {
    const canvasEl = canvasRef.current;
    const rc = rough.canvas(canvasEl);
    rc.rectangle(10, 10, 200, 200); // x, y, width, height
    rc.rectangle(20, 20, 300, 300); // x, y, width, height
    rc.line(80, 120, 300, 100); // x1, y1, x2, y2
    rc.line(0, 0, 100, 100); // x1, y1, x2, y2
  }, []);

  const handleMouseDown = e => {
    // mouse coordinates
    const { clientX, clientY } = e;

    if (selectedToolType === toolTypes.RECTANGLE) {
      setAction(actions.DRAWING);
      console.log("action", action);
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
    dispatch(updateElement(element));
  };

  const handleMouseUp = () => {
    setAction("");

    setSelectedElement(null);
  };

  return (
    <>
      <Menu />
      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </>
  );
};
export default Whiteboard;
