import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {loginAction} from "../store/reducers/auth/action-creators.ts";
import { useAppDispatch } from "../hooks/redux.ts";
import {DASHBOARD_ROUTE} from "../utils/consts.ts";

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        await dispatch(loginAction(email, password));
        navigate(DASHBOARD_ROUTE);
    }

    return (
        <div>
            <form>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button
                    type='button'
                    onClick={handleLogin}
                >Войти</button>
            </form>
        </div>
    );
};

export default LoginPage;