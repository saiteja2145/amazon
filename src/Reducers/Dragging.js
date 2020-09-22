import {
  ADD__DRAGGING__ITEM,
  REMOVE__DRAGGING__ITEM,
} from "../actions/actionTypes";

const initialState = null;

const DraggingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD__DRAGGING__ITEM:
      return action.payload;
    case REMOVE__DRAGGING__ITEM:
      return null;
    default:
      return state;
  }
};

export default DraggingReducer;
