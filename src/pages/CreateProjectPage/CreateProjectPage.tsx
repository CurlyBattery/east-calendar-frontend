import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as React from "react";

import {useAppDispatch} from "../../hooks/redux.ts";
import {DASHBOARD_ROUTE} from "../../utils/consts.ts";
import {createProjectAction} from "../../store/reducers/project/action-creators.ts";
import './_create_project.scss';


const CreateProjectPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    const handleBack = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(DASHBOARD_ROUTE);
    };

    const handleCreateProject = () => {
        dispatch(createProjectAction(name, description));
        navigate(DASHBOARD_ROUTE);
    };

    return (
        <div className='project'>
            <h1 className='project__title' >Создание проекта</h1>
            <form className='project__form'>
                <label htmlFor="">Название</label>
                <input className='project__input' type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="">Описание</label>
                <input className='project__input' type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>

                <div className='project__buttons'>
                    <button className='project__back' type='button' onClick={handleBack}>Отмена</button>
                    <button className='project__save' type='button' onClick={handleCreateProject}>Создание</button>
                </div>
            </form>
        </div>
    );
};

export default CreateProjectPage;