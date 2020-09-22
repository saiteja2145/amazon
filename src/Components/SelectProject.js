import React from "react";

const SelectProject = ({ setCurProject, curProject, projectNames }) => {
  return (
    <div className="select__container">
      <label htmlFor="selectProject">Project</label>
      <select
        id="selectProject"
        onChange={(e) => {
          setCurProject(e.target.value);
        }}
        value={curProject}
      >
        {projectNames.map((project) => (
          <option key={project.projectId} value={project.projectId}>
            {project.Name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(SelectProject);
