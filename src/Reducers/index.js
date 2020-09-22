import { combineReducers } from "redux";
import DraggingReducer from "./Dragging";
import ListReducer from "./List";

export default combineReducers({
  draggingItem: DraggingReducer,
  list: ListReducer,
});
