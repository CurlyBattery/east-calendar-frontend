import type {AppDispatch} from "../../store.ts";
import {taskSlice} from "./task.slice.ts";
import {createTask, getMyTasksByProject} from "../../../http/task.api.ts";

export const fetchTasksAction = (projectId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.tasksFetching());
        const data = await getMyTasksByProject(projectId);
        dispatch(taskSlice.actions.tasksFetchingSuccess(data));
    } catch (e) {
        // @ts-ignore
        dispatch(taskSlice.actions.tasksFetchingError(e.message));
    }
};

export const createTaskAction = (
    title: string,
    description: string,
    start: string,
    end: string,
    priority: string,
    projectId: string,
) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.createTaskStart());
        const data = await createTask(title, description, start, end, priority, projectId);
        dispatch(taskSlice.actions.createTaskSuccess(data));
    } catch (e) {
        // @ts-ignore
        dispatch(taskSlice.actions.createTaskError(e.message));
    }
}