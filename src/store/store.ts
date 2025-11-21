import {combineReducers, configureStore} from "@reduxjs/toolkit";

import userReducer from './reducers/user/user.slice.ts';
import authReducer from './reducers/auth/auth.slice.ts';
import projectReducer from './reducers/project/project.slice.ts';
import memberReducer from "./reducers/member/member.slice.ts";
import taskReducer from "./reducers/task/task.slice.ts";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    project: projectReducer,
    member: memberReducer,
    task: taskReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export const setupStore = () => {
    return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
