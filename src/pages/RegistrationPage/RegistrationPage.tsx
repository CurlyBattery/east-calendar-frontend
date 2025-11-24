import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

import {useAppDispatch} from "../../hooks/redux.ts";
import {registerAction} from "../../store/reducers/auth/action-creators.ts";
import {DASHBOARD_ROUTE, LOGIN_ROUTE} from "../../utils/consts.ts";
import './_registration.scss';

const RegistrationPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    const handleRegister = async () => {
        await dispatch(registerAction(email, password, name, avatarUrl));
        navigate(DASHBOARD_ROUTE);
    };

    return (
        <div className='registration'>
            <form className='registration__form'>
                <label>Почта</label>
                <input className='registration__input' type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label>Пароль</label>
                <input className='registration__input' type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label>Никнейм</label>
                <input className='registration__input' type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <label>Аватар</label>
                <input className='registration__input' type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)}/>

                <button
                    className='registration__button'
                    type='button'
                    onClick={handleRegister}
                >Зарегистрироваться
                </button>
                <Link className='registration__link' to={LOGIN_ROUTE}>Есть аккаунт? Войти</Link>
            </form>
        </div>
    );
};

export default RegistrationPage;