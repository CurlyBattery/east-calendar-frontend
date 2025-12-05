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
        <div className='task'>
            <div className='task__header'>
                <div className='task__header__title'>Все мои задачи</div>
            </div>
            <form className='task__search'>
                <input value={text} className='task__search__input' type="search" placeholder='Введите название или содержание' onChange={(e) => setText(e.target.value)} />
                <button className='task__search__button' type='submit' onClick={handleClick}>Искать</button>
            </form>
            <div className='task__container'>
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
            </div>
        </div>
    );
};

export default MyTasksPage;