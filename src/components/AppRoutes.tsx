import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {
    CREATE_PROJECT_ROUTE,
    DASHBOARD_ROUTE,
    EAST_ROUTE,
    LOGIN_ROUTE,
    ONE_PROJECT_ROUTE,
    REGISTRATION_ROUTE
} from "../utils/consts.ts";
import HomePage from "../pages/HomePage.tsx";
import RegistrationPage from "../pages/RegistrationPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import DashboardPage from "../pages/DashboardPage.tsx";
import Layout from "./Layout.tsx";
import type {FC} from "react";
import ErrorPage from "./ErrorPage.tsx";
import CreateProjectPage from "../pages/CreateProjectPage.tsx";
import ProjectPage from "../pages/ProjectPage.tsx";


export const router = createBrowserRouter([
    {
        path: EAST_ROUTE,
        element: <Layout />,
        errorElement: (
            <ErrorPage title='Oops! Something went wrong.' message='An unexpected error occurred.' />
        ),
        children: [
            {
              path: EAST_ROUTE,
              element: <HomePage />
            },
            {
                path: REGISTRATION_ROUTE,
                element: <RegistrationPage />
            },
            {
                path: LOGIN_ROUTE,
                element: <LoginPage />
            },
            {
                path: DASHBOARD_ROUTE,
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                )
            },
            {
                path: CREATE_PROJECT_ROUTE,
                element: (
                    <ProtectedRoute>
                        <CreateProjectPage />
                    </ProtectedRoute>
                )
            },
            {
                path: ONE_PROJECT_ROUTE,
                element: (
                    <ProtectedRoute>
                        <ProjectPage />
                    </ProtectedRoute>
                )
            },
            {
                path: '*',
                element: (
                    <ErrorPage title='404 Not Found' message='The reauested page does not exist.' />
                )
            }
        ]
    },

]);

export const AppRoutes: FC = () => {
    return <RouterProvider router={router} />;
};

