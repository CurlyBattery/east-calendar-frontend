import {type FC, useState} from "react";

import type {ITask} from "../../types/task.ts";
import './_task_item.scss';
import TaskModal from "../TaskModal/TaskModal.tsx";

interface TaskItemProps {
    task: ITask;
}

const TaskItem:FC<TaskItemProps> = ({ task }) => {
    const [openModalOne, setOpenModalOne] = useState(false);

    const handleClickOne = () => {
        setOpenModalOne(true);
    }
    return (
        <>
            <tr className='task-item' onClick={handleClickOne}>
                <td>{task.title}</td>
                <td className='task-item__hide'>{task.assignee?.name}</td>
                <td className='task-item__hide'>{task.creator?.name}</td>
                <td className='task-item__hide'>{task.priority}</td>
                <td>{task.status}</td>
                <td className='task-item__hide'>{task.createdAt?.toString()}</td>
            </tr>
            <TaskModal visible={openModalOne} setVisible={setOpenModalOne} taskId={task.id}/>
        </>

    );
};

export default TaskItem;