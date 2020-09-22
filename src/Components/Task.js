import React from "react";
import { addDraggingItem } from "../actions/draggingActions";
import { useDispatch } from "react-redux";
import { updateCheckStatus } from "../actions/dropActions";

import doneIcon from "./../images/check.svg";

const Task = ({ task, index, curProject }) => {
  const dispatch = useDispatch();

  const onDragStart = (listItem) => {
    dispatch(addDraggingItem(listItem));
  };

  const onChange = () => {
    dispatch(updateCheckStatus(index, curProject, !task.done));
  };

  return (
    <div
      id={task.taskId}
      className="task__container draggable"
      draggable={true}
      onDragStart={() => onDragStart(task.taskId)}
    >
      <input
        type="checkbox"
        id={task.taskId}
        onChange={onChange}
        checked={task.done}
      />
      <label htmlFor={task.taskId}>{task.task}</label>
      {task.done ? <img src={doneIcon} alt="done" className="icon" /> : null}
    </div>
  );
};

export default Task;
