import {Link, useNavigate} from "react-router-dom";
import React, {useCallback, useState} from "react";

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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordHint, setPasswordHint] = useState('Минимум 8 символов');

    const checkPasswordStrength = useCallback((pass: string) => {
        if (pass.length === 0) {
            setPasswordStrength(0);
            setPasswordHint('Минимум 8 символов');
            return;
        }

        let score = 0;
        const rules = {
            length: pass.length >= 8,
            uppercase: /[A-Z]/.test(pass),
            lowercase: /[a-z]/.test(pass),
            number: /[0-9]/.test(pass),
            symbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pass),
        };

        if (rules.uppercase) score += 1;
        if (rules.number) score += 1;
        if (rules.symbol) score += 1;

        let strength = 0;
        let hint = '';

        if (pass.length < 8) {
            strength = 1;
            hint = 'Слабый пароль: должен быть минимум 8 символов.';
        } else if (score <= 1) {
            strength = 1;
            hint = 'Слабый пароль: добавьте заглавные буквы, цифры или символы.';
        } else if (score === 2) {
            strength = 2;
            hint = 'Средний пароль: добавьте больше символов и цифр для надежности.';
        } else if (score >= 3) {
            strength = 3;
            hint = 'Надежный пароль!';
        }

        setPasswordStrength(strength);
        setPasswordHint(hint);
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(registerAction(email, password, confirmPassword, name, file as File));
        if(!error) navigate(DASHBOARD_ROUTE);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files && e.target.files[0])
        if(e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(e.target.value);
        checkPasswordStrength(newPassword);
    };

    const strengthClass =
        passwordStrength === 1 ? 'week' :
            passwordStrength === 2 ? 'medium' :
                passwordStrength === 3 ? 'strong' : '';

    const hintTextColor =
        passwordStrength === 1 ? '#ff6b6b' :
            passwordStrength === 2 ? '#ffd93d' :
                passwordStrength === 3 ? '#6bcf7f' : '#808080';

    return (
        <div className='registration'>
            <div className='registration__container'>
                <div className='registration__container__logo'>EastCalendar</div>
                <div className='registration__container__subtitle'>Создайте новый аккаунт</div>
                <div>{error && <p style={{color: 'red'}}>{error}</p>}</div>

                <form>
                    <div className='registration__container__form__group'>
                        <label htmlFor='name'>Никнейм</label>
                        <input id='name' className='registration__container__form__group__input' type="text"
                               value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='registration__container__form__group'>
                        <label htmlFor='email'>Почта</label>
                        <input id='email' className='registration__container__form__group__input' type="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='registration__container__form__group'>
                        <label htmlFor='password'>Пароль</label>
                        <input
                            id='password'
                            className='registration__container__form__group__input'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder='••••••••'
                        />
                        <div className='registration__container__form__strength'>
                            <div className={`registration__container__form__strength__bar ${strengthClass}`}
                                 id='strengthBar'></div>
                        </div>

                        <div className='registration__container__form__hint'
                             style={{color: hintTextColor}}>{passwordHint}</div>
                    </div>
                    <div className='registration__container__form__group'>
                        <label htmlFor="confirmPassword">Подвердите пароль</label>
                        <input
                            type="password"
                            id='confirmPassword'
                            className='registration__container__form__group__input'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <div className='registration__container__form__group'>
                        <label htmlFor='avatar'>Аватар</label>
                        <input
                            id='avatar'
                            className='registration__container__form__group__input'
                            type="file"
                            onChange={handleFileChange}
                            accept='image/*'
                        />
                    </div>

                    <div className='registration__container__form__terms'>
                        <input type="checkbox" id="terms" required/>
                        <label htmlFor="terms">
                            Я согласен с <a href="#" className='registration__container__form__terms__link'>условиями
                            использования</a> и <a href="#" className='registration__container__form__terms__link'>политикой
                            конфиденциальности</a>
                        </label>
                    </div>

                    <button
                        className='registration__container__form__button'
                        type='submit'
                        onClick={handleRegister}
                    >Создать аккаунт
                    </button>

                    <div className='registration__container__form__divider'>или</div>

                    <Link className='registration__container__form__link' to={LOGIN_ROUTE}>Есть аккаунт?
                        Войти</Link>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;