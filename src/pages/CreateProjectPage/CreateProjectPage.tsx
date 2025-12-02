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
    const [ nameCount, setNameCount ] = useState(0);
    const [ descCount, setDescCount ] = useState(0);

    const handleBack = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(DASHBOARD_ROUTE);
    };

    const handleCreateProject = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createProjectAction(name, description));
        navigate(DASHBOARD_ROUTE);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setNameCount(e.target.value.length);
    };
    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        setDescCount(e.target.value.length);
    };

    return (
        <div className='project'>
            <div className='project__container'>
                <h1 className='project__container__title'>Создание проекта</h1>
                <form className='project__container__form'>
                    <label htmlFor="">Название</label>
                    <input
                        className='project__container__form__input'
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder='Введите название проекта'
                        maxLength={100}
                    />
                    <div className='project__container__form__counter'>
                        <span id='nameCounter'>{nameCount}</span> / 100
                    </div>

                    <label htmlFor="">Описание</label>
                    <textarea
                        className='project__container__form__input'
                        value={description}
                        onChange={handleDescChange}
                        placeholder='Опишите цели и задачи проекта'
                        maxLength={500}
                    ></textarea>
                    <div className='project__container__form__counter'>
                        <span id='descCounter'>{descCount}</span> / 500
                    </div>

                    <div className='project__container__form__buttons'>
                        <button className='project__container__form__buttons__back' type='button' onClick={handleBack}>Отмена</button>
                        <button
                            className='project__container__form__buttons__save'
                            type='submit'
                            onClick={handleCreateProject}
                            disabled={!name.trim()}
                        >Создание</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectPage;