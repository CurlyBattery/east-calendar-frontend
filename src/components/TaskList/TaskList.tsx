import {type FC, useEffect, useState} from "react";

import {fetchTasksAction} from "../../store/reducers/task/action-creators.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import TaskItem from "../TaskItem/TaskItem.tsx";
import './_task.scss';
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal.tsx";

interface TaskListProps {
    projectId: string;
}

const TaskList: FC<TaskListProps> = ({ projectId }) => {
    const dispatch = useAppDispatch();
    const { tasks, isLoading, error } = useAppSelector(state => state.task);
    const [openModalCreate, setOpenModalCreate] = useState(false);

    useEffect(() => {
        dispatch(fetchTasksAction(projectId));
    }, []);

    const handleClickCreate = () => {
        setOpenModalCreate(true);
    }


    return (
        <div className='task'>
                <form className='task__search'>
                    <input className='task__search__input' type="search" placeholder='Введите название или содержание'/>
                    <button className='task__search__button' type='submit'>Искать</button>
                </form>
            <div className='task__container'>
                {isLoading && <h1>Загрузка</h1>}
                {error && <h1>{error}</h1>}
                <div className="task__scroll">
                    <table className='task__table'>
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

                <div className='task__create'>
                    <button className='task__create__button' onClick={handleClickCreate}>Создать</button>
                </div>
            </div>
            <CreateTaskModal visible={openModalCreate} setVisible={setOpenModalCreate} projectId={projectId}/>
        </div>
    )
        ;
};

export default TaskList;