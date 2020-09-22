import {
  UPDATE__LIST__ITEM,
  UPDATAE__LIST__FROM_STROAGE,
  UPDATE__TASK__CHECK,
} from "./actionTypes";

export const updateListItem = (item, index, curProject) => {
  return { type: UPDATE__LIST__ITEM, payload: { item, index, curProject } };
};

export const updateListFromStorage = (list) => {
  return { type: UPDATAE__LIST__FROM_STROAGE, payload: { newList: list } };
};

export const updateCheckStatus = (index, curProject, check) => {
  return { type: UPDATE__TASK__CHECK, payload: { index, curProject, check } };
};
