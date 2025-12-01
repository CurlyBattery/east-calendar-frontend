import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {loginAction, meAction} from "../../store/reducers/auth/action-creators.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {DASHBOARD_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts.ts";
import './_login.scss';
import {type IQRSession, QrStatus} from "../../types/user.ts";
import {checkStatusQr, getQr} from "../../http/auth.api.ts";

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error, user } = useAppSelector(state => state.auth);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [qr, setQr] = useState<string | undefined>();
    const [tkn, setTkn] = useState<string | undefined>();
    const [session, setSession] = useState<IQRSession | undefined>();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(loginAction(email, password));
        navigate(DASHBOARD_ROUTE);
    }

    useEffect(() => {
        if(user) {
            navigate(DASHBOARD_ROUTE)
        }
    }, [user]);

    useEffect(() => {
        const fetchQr = async () => {
            try {
                const {qrCode, token } = await getQr();
                const reader = new FileReader();
                reader.onloadend = function() {
                    setQr(reader.result as string);
                };
                setTkn(token)
                reader.readAsDataURL(qrCode);
            } catch (error) {
                console.error("Ошибка при получении QR-кода:", error);
                setQr(undefined);
            }
        };
        fetchQr();
    }, []);

    useEffect(() => {
        if (tkn) {
            const pollStatus = async () => {
                try {
                    const response = await checkStatusQr(tkn);
                    setSession(response.session);
                    if(response.session.status === QrStatus.SUCCESS) {
                        dispatch(meAction());
                    }
                    if (response.session.status === QrStatus.SUCCESS || response.session.status === QrStatus.REJECT) {
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Ошибка при проверке статуса:", error);
                    return true;
                }
            };
            const intervalId = setInterval(async () => {
                const stopPolling = await pollStatus();
                if (stopPolling) {
                    clearInterval(intervalId);
                }
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [tkn]);


    return (
        <div className='login'>
            <div className='login__container'>
                <div className='login__container__form__section'>
                    <div className='login__container__form__section__logo'>EastCalendar</div>
                    <div className='login__container__form__section__subtitle'>Войдите в свой аккаунт</div>

                    <form>
                        <div className='login__container__form__section__form__group'>
                            <label htmlFor="email">Почта</label>
                            <input
                                id='email'
                                className='login__container__form__section__form__input'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='your@email.com'
                                required
                            />
                        </div>
                        <div className='login__container__form__section__form__group'>
                            <label htmlFor="password">Пароль</label>
                            <input
                                id='password'
                                className='login__container__form__section__form__input'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='••••••••'
                                required
                            />
                        </div>

                        <button
                            className='login__container__form__section__form__button'
                            type='submit'
                            onClick={handleLogin}
                        >Войти
                        </button>
                        {error && <p style={{color: 'red'}}>{error}</p>}

                        <div className='login__container__form__section__form__divider'>или</div>

                        <Link className='login__container__form__section__form__link' to={REGISTRATION_ROUTE}>Нет аккаунта?
                            Создать</Link>
                    </form>
                </div>
                <div className='login__container__qr__section'>
                    <div className='login__container__qr__section__title'>Вход через QR-код</div>
                    <div className='login__container__qr__section__description'>Отсканируйте QR-код с помощью мобильного сайта</div>

                    <div className='login__container__qr__section__code'>
                        <div className='login__container__qr__section__code__placeholder'>{qr ? (
                            <img src={qr} alt="QRCode"/>
                        ) : (
                            <p>Загрузка...</p>
                        )}</div>
                    </div>
                    {session && <div>{session.status}</div>}
                </div>
            </div>

        </div>
    );
};

export default LoginPage;