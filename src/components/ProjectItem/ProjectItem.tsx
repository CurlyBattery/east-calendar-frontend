import type {FC} from "react";
import { useNavigate } from "react-router-dom";

import type {IProject} from "../../types/project.ts";
import './_project_item.scss';

interface ProjectItemProps {
    project: IProject;
}

const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
    const navigate = useNavigate();

    return (
        <tr className='project-item' onClick={() => navigate(`/projects/${project.id}`)}>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{project.owner?.name}</td>
            <td>{project.createdAt?.toString()}</td>
        </tr>
    );
};

export default ProjectItem;