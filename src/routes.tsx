import { createBrowserRouter} from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import {DASHBOARD_ROUTE, EAST_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts.ts";
import DashboardPage from "./pages/DashboardPage.tsx";
import RegistrationPage from "./pages/RegistrationPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";

export const router = createBrowserRouter([
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
    }
]);