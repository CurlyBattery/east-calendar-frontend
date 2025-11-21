import type {ITask} from "../types/task.ts";
import type {FC} from "react";

interface TaskItemProps {
    task: ITask;
}

const TaskItem:FC<TaskItemProps> = ({ task }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Задачи</th>
                        <th>Исполнитель</th>
                        <th>Автор</th>
                        <th>Прироитет</th>
                        <th>Статус</th>
                        <th>Создано</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{task.title}</td>
                        <td>{task.assignee?.name}</td>
                        <td>{task.creator?.name}</td>
                        <td>{task.priority}</td>
                        <td>{task.status}</td>
                        <td>{task.createdAt?.toString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TaskItem;