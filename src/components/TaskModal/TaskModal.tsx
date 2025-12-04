import React, {type FC, useEffect, useState} from "react";

import Modal from "../Modal.tsx";
import {type ITask, TaskPriority, TaskStatus} from "../../types/task.ts";
import {getOneTask} from "../../http/task.api.ts";
import './_task_modal.scss';
import {useAppDispatch} from "../../hooks/redux.ts";
import {updateTaskAction} from "../../store/reducers/task/action-creators.ts";

interface TaskModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    taskId: string;
}

const TaskModal: FC<TaskModalProps> = ({ visible, setVisible, taskId }) => {
    const dispatch = useAppDispatch();

    const [task, setTask] = useState<ITask | null>(null);
    console.log(task)
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus | null>(null);

    async function fetchTask() {
        try {
            if(taskId){
                const data = await getOneTask(taskId);
                setTask(data);
                setSelectedStatus(data?.status as TaskStatus);
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        (async () => {
            await fetchTask();
        })()
    }, []);



    const handleSelectPriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        dispatch(updateTaskAction(taskId, {status: e.target.value as TaskStatus}));
    }

    return (
        <Modal visible={visible} setVisible={setVisible} width={'80%'} height={'80%'}>
            <div className='one-task'>
                <div className='one-task__header'>
                    <span>/ {task?.project?.name}</span>
                    <h1 style={{ marginTop: 0, marginBottom: 0 }}>{task?.title}</h1>
                </div>
                <div className='one-task__details'>
                    <div className='one-task__detail'>
                        <h4>Описание</h4>
                        <p>{task?.description}</p>
                    </div>
                    <div className='one-task__detail'>
                        <h4>Приоритет</h4>
                        <p>{task?.priority}</p>
                    </div>
                    <div className='one-task__detail'>
                        <h4>Статус</h4>
                        <select
                            className='create-task-modal__input'
                            value={selectedStatus}
                            onChange={handleSelectPriorityChange}
                        >
                            <option key={TaskStatus.TODO} value={TaskStatus.TODO}>Новая</option>
                            <option key={TaskStatus.CHECKING} value={TaskStatus.CHECKING}>На проверке</option>
                            <option key={TaskStatus.IN_PROGRESS} value={TaskStatus.IN_PROGRESS}>Выполняется</option>
                            <option key={TaskStatus.DONE} value={TaskStatus.DONE}>Готова</option>
                        </select>

                    </div>
                    <div className='one-task__detail'>
                        <h4>Дедлайн</h4>
                        <p>{task?.end.toString()}</p>
                    </div>

                </div>
            </div>
        </Modal>
    );
};

export default TaskModal;