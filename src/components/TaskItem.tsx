import type {ITask} from "../types/task.ts";
import type {FC} from "react";

interface TaskItemProps {
    task: ITask;
}

const TaskItem:FC<TaskItemProps> = ({ task }) => {
    return (
        <tr>
            <td>{task.title}</td>
            <td>{task.assignee?.name}</td>
            <td>{task.creator?.name}</td>
            <td>{task.priority}</td>
            <td>{task.status}</td>
            <td>{task.createdAt?.toString()}</td>
        </tr>
    );
};

export default TaskItem;