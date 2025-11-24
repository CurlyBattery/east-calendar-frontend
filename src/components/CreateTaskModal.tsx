import Modal from "./Modal.tsx";
import React, {type FC, useState} from "react";
import {TaskPriority} from "../types/task.ts";
import {useAppDispatch} from "../hooks/redux.ts";
import {createTaskAction} from "../store/reducers/task/action-creators.ts";

interface CreateTaskProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    projectId: string;
}

const CreateTaskModal: FC<CreateTaskProps> = ({ visible, setVisible, projectId }) => {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [selectedPriority, setSelectedPriority] = useState(TaskPriority.MEDIUM);

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
       await dispatch(createTaskAction(title, description, start, end, selectedPriority, projectId));

       setVisible(false);
    };

    // @ts-ignore
    const handleSelectPriorityChange = (e) => {
        setSelectedPriority(e.target.value);
    };

    return (
        <Modal visible={visible} setVisible={setVisible} width={'80%'} height={'80%'}>
            <form>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                />
                <select value={selectedPriority} onChange={handleSelectPriorityChange}>
                    <option key={TaskPriority.LOW} value={TaskPriority.LOW}>Низкий</option>
                    <option key={TaskPriority.MEDIUM} value={TaskPriority.MEDIUM}>Средний</option>
                    <option key={TaskPriority.HIGH} value={TaskPriority.HIGH}>Высокий</option>
                </select>

                <button type='button' onClick={handleClick}>Добавить</button>
            </form>
        </Modal>
    );
};

export default CreateTaskModal;