import { useDispatch, useSelector } from "react-redux";

import { toolTypes } from "../constants";
import rectangleIcon from "../resources/icons/rectangle.svg";
import { setToolType } from "./whiteboardSlice";

const IconButton = ({ src, type }) => {
  const selectedToolType = useSelector(state => state.whiteboard.tool);
  const dispatch = useDispatch();

  const handleToolChange = () => {
    dispatch(setToolType(type));
  };

  console.log(selectedToolType);

  return (
    <button className={selectedToolType === type ? "menu_button_active" : "menu_button"} onClick={handleToolChange}>
      <img width="80%" height="80%" src={src} alt="rectangleIcon" />
    </button>
  );
};

const Menu = () => {
  return (
    <div className="menu_container">
      <IconButton src={rectangleIcon} type={toolTypes.RECTANGLE} />
    </div>
  );
};
export default Menu;
