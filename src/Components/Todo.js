import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateListItem, updateListFromStorage } from "../actions/dropActions";

import { removeDraggingItem } from "../actions/draggingActions";
import Task from "./Task";
import SelectProject from "./SelectProject";

const getDragAfterElement = (container, y) => {
  const draggableElements = [...container.querySelectorAll(".draggable")];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

const Todo = () => {
  const [projectNames, setProjectNames] = useState([]);
  const [curProject, setCurProject] = useState("");
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.list.items);
  const draggingItem = useSelector((state) => state.draggingItem);
  const continerRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      //We can save it local storage and preserve data
      //const localStorageData = JSON.parse(localStorage.getItem("list"));

      const { data: responseData } = await Axios(
        "http://demo0242938.mockable.io/todo"
      );
      const projectNames = [];
      //Generate ID for each element
      const projects = responseData["Project"].map((project) => {
        const projectId = v4();
        const projectName = project.Name;

        projectNames.push({ Name: projectName, projectId });

        return {
          ...project,
          Tasks: project.Tasks.map((task) => ({
            task,
            taskId: v4(),
            done: false,
          })),
          projectId,
        };
      });

      dispatch(updateListFromStorage(projects));
      setProjectNames(projectNames);
      setCurProject(projects[0]?.projectId);
    };

    fetchData();
  }, [dispatch]);

  const currentTasks = curProject
    ? projects.find((project) => project.projectId === curProject)
    : null;

  const onDragOver = (e) => {
    e.preventDefault();
    let nextEl = getDragAfterElement(continerRef.current, e.clientY);
    let nextIndex;
    if (nextEl) {
      nextIndex = currentTasks["Tasks"].findIndex(
        (listI) => listI.taskId === nextEl.id
      );
    } else {
      nextIndex = currentTasks["Tasks"].length;
    }
    dispatch(updateListItem(draggingItem, nextIndex, curProject));
  };

  const onDrop = (e) => {
    dispatch(removeDraggingItem());
    localStorage.setItem("list", JSON.stringify(projects));
  };

  return (
    <div>
      <div className="project__container">
        <SelectProject
          setCurProject={setCurProject}
          curProject={curProject}
          projectNames={projectNames}
        />
        <div
          className="todo__container"
          onDragOver={onDragOver}
          onDrop={onDrop}
          ref={continerRef}
        >
          {currentTasks &&
            currentTasks["Tasks"].map((task, index) => (
              <Task
                key={task.taskId}
                task={task}
                index={index}
                curProject={curProject}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
