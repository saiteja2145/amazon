import {
  UPDATE__LIST__ITEM,
  UPDATAE__LIST__FROM_STROAGE,
  UPDATE__TASK__CHECK,
} from "../actions/actionTypes";

const initialState = {
  items: [],
};

const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE__LIST__ITEM:
      const newState = JSON.parse(JSON.stringify(state.items));

      const projectIndex = [...newState].findIndex(
        (project) => project.projectId === action.payload.curProject
      );

      const project = {
        ...newState[projectIndex],
      };

      const newItems = [];
      let updateItem;
      for (const listItem of [...project["Tasks"]]) {
        if (listItem.taskId !== action.payload.item) {
          newItems.push(listItem);
        } else {
          updateItem = listItem;
        }
      }

      const newProjects = [...newState];
      newItems.splice(action.payload.index, 0, updateItem);
      newProjects[projectIndex]["Tasks"] = [...newItems];

      return { items: newState };
    case UPDATE__TASK__CHECK:
      const newListItems = JSON.parse(JSON.stringify(state.items));

      const newProjectIndex = [...newListItems].findIndex(
        (project) => project.projectId === action.payload.curProject
      );

      const newProject = {
        ...newListItems[newProjectIndex],
      };

      const newTaskItems = [...newProject["Tasks"]];
      newTaskItems[action.payload.index] = {
        ...newTaskItems[action.payload.index],
        done: action.payload.check,
      };
      const newProjectsList = [...newListItems];
      newProjectsList[newProjectIndex]["Tasks"] = [...newTaskItems];
      return { items: newListItems };
    case UPDATAE__LIST__FROM_STROAGE:
      const newList = action.payload.newList;
      return { items: [...newList] };
    default:
      return state;
  }
};

export default ListReducer;
