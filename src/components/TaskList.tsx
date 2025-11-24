import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {type FC, useEffect, useState} from "react";
import {fetchTasksAction} from "../store/reducers/task/action-creators.ts";
import TaskItem from "./TaskItem.tsx";
import CreateTaskModal from "./CreateTaskModal.tsx";

interface TaskListProps {
    projectId: string;
}

const TaskList: FC<TaskListProps> = ({ projectId }) => {
    const dispatch = useAppDispatch();
    const { tasks, isLoading, error } = useAppSelector(state => state.task);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(fetchTasksAction(projectId));
    }, []);

    const handleClick = () => {
        setOpenModal(true);
    }

    return (
        <div>
            <div>
                {isLoading && <h1>Загрузка</h1>}
                {error && <h1>{error}</h1>}

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
                        {tasks && tasks.map(task =>
                            <TaskItem key={task.id} task={task}/>
                        )}
                        </tbody>
                    </table>

        </div>
    <div>
        <button onClick={handleClick}>Создать</button>
    </div>
    <CreateTaskModal visible={openModal} setVisible={setOpenModal} projectId={projectId}/>
</div>
)
    ;
};

export default TaskList;