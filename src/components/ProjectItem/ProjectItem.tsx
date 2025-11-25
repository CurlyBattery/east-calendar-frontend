import type {FC} from "react";
import {Link, useNavigate} from "react-router-dom";

import type {IProject} from "../../types/project.ts";
import './_project_item.scss';

interface ProjectItemProps {
    project: IProject;
}

const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
    return (
        <tr className='project-item'>
            <td><Link to={`/projects/${project.id}`}>{project.name}</Link></td>
            <td>{project.description}</td>
            <td>{project.owner?.name}</td>
            <td>{project.createdAt?.toString()}</td>
        </tr>
    );
};

export default ProjectItem;