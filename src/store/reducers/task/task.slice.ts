import type {ITask} from "../../../types/task.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface TaskSlice {
    tasks: ITask[];
    isLoading: boolean;
    error: string;
}

const initialState: TaskSlice = {
    tasks: [],
    isLoading: false,
    error: ''
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        tasksFetching: (state) => {
            state.isLoading = true;
        },
        tasksFetchingSuccess: (state, action: PayloadAction<ITask[]>) => {
            state.isLoading = false;
            state.error = '';
            state.tasks = action.payload;
        },
        tasksFetchingError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        createTaskStart: (state) => {
            state.isLoading = true;
        },
        createTaskSuccess: (state, action: PayloadAction<ITask>) => {
            state.isLoading = false;
            state.error = '';
            state.tasks.push(action.payload)
        },
        createTaskError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateTaskStart: (state) => {
            state.isLoading = true;
        },
        updateTaskSuccess: (state, action: PayloadAction<ITask>) => {
            state.isLoading = false;
            state.error = '';
            const updatedTask = action.payload;
            const index = state.tasks.findIndex(task => task.id === updatedTask.id);
            console.log(index);
            console.log(updatedTask);
            console.log(index)
            if (index !== -1) {
                state.tasks[index] = updatedTask;
            }
        },
        updateTaskError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default taskSlice.reducer;