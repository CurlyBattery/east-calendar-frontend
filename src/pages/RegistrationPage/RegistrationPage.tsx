import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {registerAction} from "../../store/reducers/auth/action-creators.ts";
import {DASHBOARD_ROUTE, LOGIN_ROUTE} from "../../utils/consts.ts";
import './_registration.scss';

const RegistrationPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error } = useAppSelector(state => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleRegister = async () => {
        await dispatch(registerAction(email, password, name, file as File));
        if(!error) navigate(DASHBOARD_ROUTE);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files && e.target.files[0])
        if(e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className='registration'>
            <form className='registration__form'>
                <label>Почта</label>
                <input className='registration__input' type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label>Пароль</label>
                <input className='registration__input' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label>Никнейм</label>
                <input className='registration__input' type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <label>Аватар</label>
                <input
                    className='registration__input'
                    type="file"
                    onChange={handleFileChange}
                    accept='image/*'
                />

                <button
                    className='registration__button'
                    type='button'
                    onClick={handleRegister}
                >Зарегистрироваться
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Link className='registration__link' to={LOGIN_ROUTE}>Есть аккаунт? Войти</Link>
            </form>
        </div>
    );
};

export default RegistrationPage;