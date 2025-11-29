import {createBrowserRouter, RouterProvider} from "react-router-dom";
import type {FC} from "react";

import {
    ALL_DEVICES_ROUTE,
    CREATE_PROJECT_ROUTE,
    DASHBOARD_ROUTE,
    EAST_ROUTE,
    LOGIN_ROUTE,
    ONE_PROJECT_ROUTE, PREMIUM_ROUTE, QR_LOGIN_ROUTE,
    REGISTRATION_ROUTE, SCAN_ROUTE
} from "../utils/consts.ts";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import Layout from "./Layout.tsx";
import ErrorPage from "./ErrorPage.tsx";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage.tsx";
import CreateProjectPage from "../pages/CreateProjectPage/CreateProjectPage.tsx";
import DashboardPage from "../pages/DashboardPage/DashboardPage.tsx";
import QrCodeLoginPage from "../pages/QrCodeLoginPage/QrCodeLoginPage.tsx";
import HomePage from "../pages/HomePage/HomePage.tsx";
import ProjectPage from "../pages/ProjectPage/ProjectPage.tsx";
import PremiumPage from "../pages/PremiumPage/PremiumPage.tsx";
import AllDevices from "../pages/AllDevicesPage/AllDevices.tsx";
import ScanPage from "../pages/ScanPage/ScanPage.tsx";


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
                path: QR_LOGIN_ROUTE,
                element: <QrCodeLoginPage />
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
                path: PREMIUM_ROUTE,
                element: (
                    <ProtectedRoute>
                        <PremiumPage />
                    </ProtectedRoute>
                )
            },
            {
                path: ALL_DEVICES_ROUTE,
                element: (
                    <ProtectedRoute>
                        <AllDevices />
                    </ProtectedRoute>
                )
            },
            {
                path: SCAN_ROUTE,
                element: (
                    <ProtectedRoute>
                            <ScanPage />
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

