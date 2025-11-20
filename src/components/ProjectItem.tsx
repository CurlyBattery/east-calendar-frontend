import type {IProject} from "../types/project.ts";
import type {FC} from "react";
import { useNavigate} from "react-router-dom";

interface ProjectItemProps {
    project: IProject;
}

const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
    const navigate = useNavigate();

    const handleClick = (id: string) => {
        navigate(`/projects/${id}`);
    }

    return (
        <div onClick={() => handleClick(project.id)}>
            {project.id}. {project.name}
        </div>
    )
};

export default  ProjectItem;