import type {FC} from "react";
import { useNavigate } from "react-router-dom";
import {format} from "date-fns";

import type {IProject} from "../../types/project.ts";
import sheep from '../../assets/images/sheep2.jpg';
import './_project_item.scss';

interface ProjectItemProps {
    project: IProject;
}

const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
    const navigate = useNavigate();
    const avatar = project?.owner?.avatarPath ? `https://www.east-calendar.ru/${project?.owner?.avatarPath}` : 'https://i.pinimg.com/736x/61/8e/b9/618eb95d5194903a7ab2a6641f152bd0.jpg'

    return (
        <div
            className='project_card'
            onClick={() => navigate(`/projects/${project.id}`)}
        >
            <div className='project_card__container'>
                <img
                    className='project_card__container__image'
                    src={sheep}
                    alt="project.name"
                />
            </div>

            <div className='project_card__content'>
                <h3 className='project_card__content__title'>{project.name}</h3>
                <p className='project_card__content__description'>
                    {project.description}
                </p>
            </div>

            <div className='project_card__footer'>
                <div className='project_card__footer__owner'>
                    <img
                        className='project_card__footer__owner__icon'
                        src={avatar}
                        alt="аватар"
                    />
                    <span>{project?.owner?.name}</span>
                </div>
                <div className='project_card__footer__date'>
                    {format(project?.createdAt as Date, "yyyy-MM-dd")}
                </div>
            </div>


        </div>
    );
};

export default ProjectItem;