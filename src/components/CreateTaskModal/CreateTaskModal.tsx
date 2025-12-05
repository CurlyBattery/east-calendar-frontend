import React, {type FC, useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {TaskPriority} from "../../types/task.ts";
import {createTaskAction} from "../../store/reducers/task/action-creators.ts";
import Modal from "../Modal.tsx";
import './_create_task.scss';
import {fetchMembersAction} from "../../store/reducers/member/action-creators.ts";
import {PlanUser} from "../../types/user.ts";

interface CreateTaskProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    projectId: string;
}

const CreateTaskModal: FC<CreateTaskProps> = ({ visible, setVisible, projectId }) => {
    const dispatch = useAppDispatch();
    const { members } = useAppSelector(state => state.member);
    const { user } = useAppSelector(state => state.auth);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [selectedPriority, setSelectedPriority] = useState(TaskPriority.MEDIUM);
    const [ selectedMemberId, setSelectedMemberId ] = useState('');

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setStart('');
        setEnd('');
        setSelectedPriority(TaskPriority.MEDIUM)
        setSelectedMemberId('')
    }

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !start || !end) {
            alert("Пожалуйста, заполните название, дату начала и дату окончания.");
            return;
        }

        await dispatch(createTaskAction(title, description, start, end, selectedPriority, projectId, selectedMemberId));
        resetForm();
        setVisible(false);
    };

    const handleSelectPriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPriority(e.target.value as TaskPriority);
    };

    useEffect(() => {
        if (visible) {
            dispatch(fetchMembersAction(projectId));
        }
    }, [dispatch, projectId, visible]);

    const handleSelectMemberIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMemberId(e.target.value)
    };

    return (
        <Modal visible={visible} setVisible={setVisible}>
            <form className='create-task-modal' onSubmit={handleClick}>

                <h2 className='create-task-modal__header'>Создать новую задачу</h2>

                <div className='create-task-modal__form-group'>
                    <label htmlFor="title">Название</label>
                    <input
                        id="title"
                        className='create-task-modal__input'
                        type="text"
                        placeholder="Краткое описание задачи"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className='create-task-modal__form-group'>
                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        className='create-task-modal__input create-task-modal__textarea'
                        placeholder="Подробная информация о задаче"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                </div>

                {/* Блок с датами в одной строке */}
                <div className='create-task-modal__dates-group'>
                    <div className='create-task-modal__form-group'>
                        <label htmlFor="start">Дата начала</label>
                        <input
                            id="start"
                            className='create-task-modal__input'
                            type="datetime-local"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            required
                        />
                    </div>
                    <div className='create-task-modal__form-group'>
                        <label htmlFor="end">Дата окончания</label>
                        <input
                            id="end"
                            className='create-task-modal__input'
                            type="datetime-local"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            required
                        />
                    </div>
                </div>


                <div className='create-task-modal__selects-group'>
                    {/* Выбор приоритета */}
                    <div className='create-task-modal__form-group'>
                        <label htmlFor="priority">Приоритет</label>
                        <select
                            id="priority"
                            className='create-task-modal__input create-task-modal__select'
                            value={selectedPriority}
                            onChange={handleSelectPriorityChange}
                        >
                            <option value={TaskPriority.LOW}>Низкий</option>
                            <option value={TaskPriority.MEDIUM}>Средний</option>
                            <option value={TaskPriority.HIGH}>Высокий</option>
                        </select>
                    </div>

                    {user?.plan?.subscriptionPlan === PlanUser.PRO && (
                        <div className='create-task-modal__form-group'>
                            <label htmlFor="member">Исполнитель</label>
                            <select
                                id="member"
                                className='create-task-modal__input create-task-modal__select'
                                value={selectedMemberId}
                                onChange={handleSelectMemberIdChange}
                            >
                                <option value="">(Выбрать)</option>
                                {members.map(member => (
                                    <option key={member?.user?.id} value={member?.user?.id}>
                                        {member?.user?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <button
                    className='create-task-modal__button primary-button'
                    type='submit'
                >
                    Добавить Задачу
                </button>
            </form>
        </Modal>
    );
};

export default CreateTaskModal;