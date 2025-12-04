import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {useEffect} from "react";
import {fetchMyTasksAction} from "../../store/reducers/task/action-creators.ts";
import TaskItem from "../../components/TaskItem/TaskItem.tsx";

const MyTasksPage = () => {
    const dispatch = useAppDispatch();
    const { tasks } = useAppSelector(state => state.task);

    useEffect(() => {
        dispatch(fetchMyTasksAction());
    }, []);

    return (
        <div>
            {tasks && tasks.map(task =>
                <TaskItem key={task.id} task={task}/>
            )}
        </div>
    );
};

export default MyTasksPage;