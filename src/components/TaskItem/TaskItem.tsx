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
                <td>{task.assignee?.name}</td>
                <td>{task.creator?.name}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>{task.createdAt?.toString()}</td>
            </tr>
            <TaskModal visible={openModalOne} setVisible={setOpenModalOne} taskId={task.id}/>
        </>

    );
};

export default TaskItem;