import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {loginAction} from "../../store/reducers/auth/action-creators.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {DASHBOARD_ROUTE, QR_LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts.ts";
import './_login.scss';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error } = useAppSelector(state => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        await dispatch(loginAction(email, password));
        navigate(DASHBOARD_ROUTE);
    }

    return (
        <div className='login'>
            <form className='login__form'>
                <label htmlFor="">Почта</label>
                <input className='login__input' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="">Пароль</label>
                <input className='login__input' type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button
                    className='login__button'
                    type='button'
                    onClick={handleLogin}
                >Войти</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Link className='login__link' to={QR_LOGIN_ROUTE}>Вход через QRCode</Link>
                <Link className='login__link' to={REGISTRATION_ROUTE}>Нет аккаунта? Создать</Link>
            </form>
        </div>
    );
};

export default LoginPage;