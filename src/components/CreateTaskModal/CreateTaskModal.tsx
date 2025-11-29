import React, {type FC, useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {TaskPriority} from "../../types/task.ts";
import {createTaskAction} from "../../store/reducers/task/action-creators.ts";
import Modal from "../Modal.tsx";
import './_create_task.scss';
import {fetchMembersAction} from "../../store/reducers/member/action-creators.ts";

interface CreateTaskProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    projectId: string;
}

const CreateTaskModal: FC<CreateTaskProps> = ({ visible, setVisible, projectId }) => {
    const dispatch = useAppDispatch();
    const { members } = useAppSelector(state => state.member);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [selectedPriority, setSelectedPriority] = useState(TaskPriority.MEDIUM);
    const [ selectedMemberId, setSelectedMemberId ] = useState('');


    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
       await dispatch(createTaskAction(title, description, start, end, selectedPriority, projectId, selectedMemberId));
        setTitle('');
        setDescription('');
        setStart('');
        setEnd('');
        setSelectedPriority(TaskPriority.MEDIUM)
        setSelectedMemberId('')

       setVisible(false);
    };

    // @ts-ignore
    const handleSelectPriorityChange = (e) => {
        setSelectedPriority(e.target.value);
    };

    useEffect(() => {
        dispatch(fetchMembersAction(projectId));
    }, [dispatch, projectId]);

    // @ts-ignore
    const handleSelectMemberIdChange = (e) => {
        setSelectedMemberId(e.target.value)
    };

    return (
        <Modal visible={visible} setVisible={setVisible} width={'80%'} height={'80%'}>
            <form className='create-task-modal'>
                <h1 className='create-task-modal__header'>Создать новую задачу</h1>
                <select value={selectedMemberId} onChange={handleSelectMemberIdChange}>
                    {members && members.map(member =>
                        <option key={member?.user?.id} id={member?.user?.id} value={member?.user?.id}>
                            {member?.user?.name}
                        </option>
                    )}
                </select>
                <label>Название</label>
                <input
                    className='create-task-modal__input'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Описание</label>
                <input
                    className='create-task-modal__input'
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Дата начала</label>
                <input
                    className='create-task-modal__input'
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                />
                <label>Дата окончания</label>
                <input
                    className='create-task-modal__input'
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                />
                <label>Приоритет</label>
                <select
                    className='create-task-modal__input'
                    value={selectedPriority}
                    onChange={handleSelectPriorityChange}
                >
                    <option key={TaskPriority.LOW} value={TaskPriority.LOW}>Низкий</option>
                    <option key={TaskPriority.MEDIUM} value={TaskPriority.MEDIUM}>Средний</option>
                    <option key={TaskPriority.HIGH} value={TaskPriority.HIGH}>Высокий</option>
                </select>

                <button
                    className='create-task-modal__button'
                    type='button'
                    onClick={handleClick}
                >Добавить
                </button>
            </form>
        </Modal>
    );
};

export default CreateTaskModal;
