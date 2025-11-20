import {Navigate} from "react-router-dom";

import {useAppSelector} from "../hooks/redux.ts";
import {LOGIN_ROUTE} from "../utils/consts.ts";

// @ts-ignore
export function ProtectedRoute({ children }) {
    const { isAuth, isLoading } = useAppSelector(state => state.auth);

    return isAuth ? children : isLoading ? <h1>Загрузка..</h1>  : <Navigate to={LOGIN_ROUTE}/>;
}