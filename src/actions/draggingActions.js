import { ADD__DRAGGING__ITEM, REMOVE__DRAGGING__ITEM } from "./actionTypes";

export const addDraggingItem = (item) => {
  return { type: ADD__DRAGGING__ITEM, payload: item };
};

export const removeDraggingItem = () => {
  return { type: REMOVE__DRAGGING__ITEM };
};
