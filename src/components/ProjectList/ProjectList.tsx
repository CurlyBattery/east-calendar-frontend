import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {fetchMyProjectsAction} from "../../store/reducers/project/action-creators.ts";
import {CREATE_PROJECT_ROUTE} from "../../utils/consts.ts";
import './_project_list.scss';
import ProjectItem from "../ProjectItem/ProjectItem.tsx";


const ProjectList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { projects } = useAppSelector(state => state.project);

    useEffect(() => {
        dispatch(fetchMyProjectsAction());
    }, [])

    const handleClick = () => {
        navigate(CREATE_PROJECT_ROUTE);
    };

    return (
        <div className='project_list'>
            <div className='project_list__header'>
                <h1 className='project_list__header__title'>Проекты</h1>
                <button className='project_list__header__create' type='button' onClick={handleClick}>Создать проект</button>
            </div>

            <div className='project_list__search'>
                <input className='project_list__search__input' type="search" placeholder='Поиск проектов...' />
                <button className='project_list__search__button'>Искать</button>
            </div>
            <div className='project_list__container'>
                <table className='project_list__container__table'>
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Описание</th>
                            <th>Руководитель</th>
                            <th>Создано</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects && projects.map(project =>
                            <ProjectItem key={project.id} project={project}/>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default  ProjectList;