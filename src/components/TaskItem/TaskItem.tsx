import {type FC, useState} from "react";

import {type ITask, TASK_PRIORITY_LABELS, TASK_STATUS_LABELS} from "../../types/task.ts";
import './_task_item.scss';
import TaskModal from "../TaskModal/TaskModal.tsx";
import {format} from "date-fns";

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
                <td className='task-item__hide'>{TASK_PRIORITY_LABELS[task.priority]}</td>
                <td>{TASK_STATUS_LABELS[task.status]}</td>
                <td className='task-item__hide'>{format(task.createdAt as Date, "yyyy-MM-dd")}</td>
            </tr>
            <TaskModal visible={openModalOne} setVisible={setOpenModalOne} taskId={task.id}/>
        </>

    );
};

export default TaskItem;