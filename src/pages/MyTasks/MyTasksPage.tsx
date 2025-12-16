import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {fetchMyTasksAction} from "../../store/reducers/task/action-creators.ts";
import TaskItem from "../../components/TaskItem/TaskItem.tsx";
import './_my_tasks.scss';

const MyTasksPage = () => {
    const dispatch = useAppDispatch();
    const { tasks } = useAppSelector(state => state.task);
    const [text, setText] = useState<string>("");

    useEffect(() => {
        dispatch(fetchMyTasksAction());
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(fetchMyTasksAction(text));
    }

    return (
        <div className='my_task'>
            <div className='my_task__header'>
                <div className='my_task__header__title'>Все мои задачи</div>
            </div>
            <form className='my_task__search'>
                <input value={text} className='my_task__search__input' type="search" placeholder='Введите название или содержание' onChange={(e) => setText(e.target.value)} />
                <button className='my_task__search__button' type='submit' onClick={handleClick}>Искать</button>
            </form>
            <div className='my_task__container'>
                <div className="my_task__scroll">
                <table className='my_task__table'>
                        <thead>
                            <tr>
                                <th>Задачи</th>
                                <th className='my_task__table__hide'>Исполнитель</th>
                                <th className='my_task__table__hide'>Автор</th>
                                <th className='my_task__table__hide'>Прироитет</th>
                                <th>Статус</th>
                                <th className='my_task__table__hide'>Создано</th>
                            </tr>
                            </thead>
                        <tbody>
                        {tasks && tasks.map(task =>
                            <TaskItem key={task.id} task={task}/>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyTasksPage;