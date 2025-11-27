import {type FC, useEffect, useState} from "react";

import Modal from "../Modal.tsx";
import type {ITask} from "../../types/task.ts";
import {getOneTask} from "../../http/task.api.ts";
import './_task_modal.scss';

interface TaskModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    taskId: string;
}

const TaskModal: FC<TaskModalProps> = ({ visible, setVisible, taskId }) => {
    const [task, setTask] = useState<ITask | null>(null);

    useEffect(() => {
        (async () => {
            await fetchTask();
        })()
    }, []);

    async function fetchTask() {
        try {
            if(taskId){
                const data = await getOneTask(taskId);
                setTask(data);
            }
        } catch (e) {
            console.log(e)
        }
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
                        <p>{task?.status}</p>
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