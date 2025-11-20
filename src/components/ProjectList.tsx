import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {fetchMyProjectsAction} from "../store/reducers/project/action-creators.ts";
import ProjectItem from "./ProjectItem.tsx";
import { CREATE_PROJECT_ROUTE } from "../utils/consts.ts";

const ProjectList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { projects, isLoading, error } = useAppSelector(state => state.project);

    useEffect(() => {
        dispatch(fetchMyProjectsAction());
    }, [])

    const handleClick = () => {
        navigate(CREATE_PROJECT_ROUTE);
    };

    return (
        <div>
            <button onClick={handleClick}>Создать проект</button>
            {isLoading && <h1>Идет загрузка..</h1>}
            {error && <h1>Произошла ошибка при загрузке</h1>}
            {projects && projects.map(project =>
                <ProjectItem key={project.id} project={project} />
            )}
        </div>
    )
};

export default  ProjectList;