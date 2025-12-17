import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {fetchMyProjectsAction} from "../../store/reducers/project/action-creators.ts";
import {CREATE_PROJECT_ROUTE} from "../../utils/consts.ts";
import './_project_list.scss';
import ProjectItem from "../ProjectItem/ProjectItem.tsx";
import hand from '../../assets/images/hand.png';


const ProjectList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { projects } = useAppSelector(state => state.project);
    const [text, setText] = useState<string>("");

    useEffect(() => {
        dispatch(fetchMyProjectsAction());
    }, []);

    const handleClickSearch = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(fetchMyProjectsAction(text));
    }

    const handleClick = () => {
        navigate(CREATE_PROJECT_ROUTE);
    };

    return (
        <div className='project_list'>
            <div className='project_list__header'>
                <div className='project_list__header__title'>Для вас</div>
                <button
                    className='project_list__header__create'
                    type='button'
                    onClick={handleClick}
                >
                    Создать проект
                </button>
            </div>

            <form className='project_list__search'>
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className='project_list__search__input'
                    type="search"
                    placeholder='Поиск проектов..'
                />
                <button className='project_list__search__button' type='submit' onClick={handleClickSearch}>Искать</button>
            </form>

            {projects && projects.length > 0 ? (
                <div className='project_list__grid'>
                    {projects && projects.map(project =>
                        <ProjectItem key={project.id} project={project}/>
                    )}
                </div>
            ) : (
                <div className='project_list__empty'>
                    <div className='project_list__empty__icon'>
                        <img src={hand} alt="рука"/>
                    </div>
                    <h3 className='project_list__empty__title'>
                        Добро пожаловать в EastCalendar!
                    </h3>
                    <p className='project_list__empty__description'>
                        У вас пока нет проектов. Создайте свой первый проект, начать планировать задачи и управлять своим временем эффективно.
                    </p>
                    <button
                        className='project_list__empty__button'
                        onClick={handleClick}
                    >
                        Создать первый проект
                    </button>
                </div>
            )}

        </div>
    )
};

export default ProjectList;
