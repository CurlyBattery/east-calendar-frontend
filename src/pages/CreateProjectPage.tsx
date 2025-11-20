import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {DASHBOARD_ROUTE} from "../utils/consts.ts";
import * as React from "react";
import {useAppDispatch} from "../hooks/redux.ts";
import {createProjectAction} from "../store/reducers/project/action-creators.ts";

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
        <div>
            <h1>Создание проекта</h1>
            <form>
                <label htmlFor="">Название</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="">Описание</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>

                <button type='button' onClick={handleBack}>Отмена</button>
                <button type='button' onClick={handleCreateProject}>Создание</button>
            </form>
        </div>
    );
};

export default CreateProjectPage;