import { toolTypes } from "../../constants";

export const adjustmentRequired = type =>
  // array returning boolean value
  [toolTypes.RECTANGLE].includes(type);
