import type {AppDispatch} from "../../store.ts";
import {projectSlice} from "./project.slice.ts";
import {createProject, getMyProjects} from "../../../http/project.api.ts";

export const fetchMyProjectsAction = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectSlice.actions.projectsFetching());
        const data = await getMyProjects();
        dispatch(projectSlice.actions.projectsFetchingSuccess(data));
    } catch (e) {
        // @ts-ignore
        dispatch(projectSlice.actions.projectsFetchingError(e.message));
    }
};

export const createProjectAction = (name: string, description: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectSlice.actions.createProjectStart());
        const newProject = await createProject(name, description);
        dispatch(projectSlice.actions.createProjectSuccess(newProject))
    } catch (e) {
        // @ts-ignore
        dispatch(projectSlice.actions.createProjectError(e.message));
    }
}