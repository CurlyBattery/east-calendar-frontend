import {Navigate} from "react-router-dom";

export function ProtectedRoute({ children }) {
    const isAuthorizedUser = true;
    return isAuthorizedUser ? children : <Navigate to="/login" />;
}