import type {IProject} from "../../../types/project.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface ProjectSlice {
    projects: IProject[];
    isLoading: boolean;
    error: string;
}

const initialState: ProjectSlice = {
    projects: [],
    isLoading: false,
    error: '',
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        projectsFetching: (state) => {
            state.isLoading = true;
        },
        projectsFetchingSuccess: (state, action: PayloadAction<IProject[]>) => {
            state.isLoading = false;
            state.error = '';
            state.projects = action.payload;
        },
        projectsFetchingError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        createProjectStart: (state) => {
            state.isLoading = true;
        },
        createProjectSuccess: (state, action: PayloadAction<IProject>) => {
            state.isLoading = false;
            state.error = '';
            state.projects.push(action.payload)
        },
        createProjectError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
});

export default projectSlice.reducer;