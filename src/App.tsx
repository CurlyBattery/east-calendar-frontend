import './App.css'

import {useAppDispatch} from "./hooks/redux.ts";
import {useEffect} from "react";
import {meAction} from "./store/reducers/auth/action-creators.ts";
import {AppRoutes} from "./components/AppRoutes.tsx";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(meAction());
    }, [dispatch])

    return <AppRoutes />;
}

export default App;
