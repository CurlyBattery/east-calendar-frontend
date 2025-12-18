import {type FC, useEffect, useState} from "react";

import {fetchTasksAction} from "../../store/reducers/task/action-creators.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import TaskItem from "../TaskItem/TaskItem.tsx";
import './_task.scss';
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal.tsx";
import cactus from '../../assets/images/cactus.png';

interface TaskListProps {
    projectId: string;
}

const TaskList: FC<TaskListProps> = ({ projectId }) => {
    const dispatch = useAppDispatch();
    const { tasks, isLoading, error } = useAppSelector(state => state.task);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [text, setText] = useState<string>("");

    useEffect(() => {
        dispatch(fetchTasksAction(projectId));
    }, []);

    const handleClickCreate = () => {
        setOpenModalCreate(true);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(fetchTasksAction(projectId, text));
    };

    return (
        <div className='task'>
            <div className='task__wrapper'>
                <form className='task__search'>
                    <input
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className='task__search__input'
                        type="search"
                        placeholder='Поиск задач..'
                    />
                    <button className='task__search__button' type='submit' onClick={handleClick}>Искать</button>
                </form>
                <div className='task__container'>
                    {isLoading && <h1>Загрузка</h1>}
                    {error && <h1>{error}</h1>}
                    <div className="task__scroll">
                        <table className='task__table'>
                            <thead>
                            <tr>
                                <th>Задачи</th>
                                <th className='task__table__hide'>Исполнитель</th>
                                <th className='task__table__hide'>Автор</th>
                                <th className='task__table__hide'>Прироитет</th>
                                <th>Статус</th>
                                <th className='task__table__hide'>Создано</th>
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
            </div>
            <div className='task__image'>
                <img src={cactus} alt=""/>
            </div>
            <CreateTaskModal visible={openModalCreate} setVisible={setOpenModalCreate} projectId={projectId}/>
        </div>
    )
        ;
};

export default TaskList;