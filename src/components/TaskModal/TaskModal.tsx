import React, {type FC, useEffect, useState} from "react";

import Modal from "../Modal.tsx";
import {type ITask, TaskStatus} from "../../types/task.ts";
import {getOneTask} from "../../http/task.api.ts";
import './_task_modal.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {updateTaskAction} from "../../store/reducers/task/action-creators.ts";
import {PlanUser} from "../../types/user.ts";
import {format} from "date-fns";

interface TaskModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    taskId: string;
}

const TaskModal: FC<TaskModalProps> = ({ visible, setVisible, taskId }) => {
    const dispatch = useAppDispatch();
    const { members } = useAppSelector(state => state.member);
    const { user } = useAppSelector(state => state.auth);
    const [task, setTask] = useState<ITask | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus | null>(null);
    const [ selectedMemberId, setSelectedMemberId ] = useState('');

    async function fetchTask() {
        try {
            if(taskId){
                const data = await getOneTask(taskId);
                setTask(data);
                setSelectedStatus(data?.status as TaskStatus);
                setSelectedMemberId(data?.assigneeId as string);
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        (async () => {
            await fetchTask();
        })()
    }, [selectedMemberId, selectedStatus]);

    const handleSelectStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSelectedStatus(e.target.value as TaskStatus);
        dispatch(updateTaskAction(taskId, {status: e.target.value as TaskStatus}));
    }

    const handleSelectMemberIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSelectedMemberId(e.target.value as string);
        dispatch(updateTaskAction(taskId, {assigneeId: e.target.value as string}));
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
                            value={selectedStatus as TaskStatus}
                            onChange={handleSelectStatusChange}
                        >
                            <option key={TaskStatus.TODO} value={TaskStatus.TODO}>Новая</option>
                            <option key={TaskStatus.CHECKING} value={TaskStatus.CHECKING}>На проверке</option>
                            <option key={TaskStatus.IN_PROGRESS} value={TaskStatus.IN_PROGRESS}>Выполняется</option>
                            <option key={TaskStatus.DONE} value={TaskStatus.DONE}>Готова</option>
                        </select>

                    </div>
                    {user?.plan?.subscriptionPlan === PlanUser.PRO && (
                        <div className='one-task__detail'>
                            <h4>Исполнитель</h4>
                            <select
                                id="member"
                                className='create-task-modal__input'
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
                    <div className='one-task__detail'>
                        <h4>Дедлайн</h4>
                        {task?.end && <p>{format(task?.end as Date, "yyyy-MM-dd")}</p>}
                    </div>

                </div>
            </div>
        </Modal>
    );
};

export default TaskModal;
