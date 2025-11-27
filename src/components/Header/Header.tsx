import {Link, useNavigate} from "react-router-dom";
import './_header.scss';

import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {logoutAction} from "../../store/reducers/auth/action-creators.ts";
import {DASHBOARD_ROUTE, EAST_ROUTE, LOGIN_ROUTE} from "../../utils/consts.ts";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuth, user } = useAppSelector(state => state.auth);
    const avatar = user?.avatarUrl ? `http://localhost:5000/${user?.avatarUrl}` : 'https://i.pinimg.com/736x/61/8e/b9/618eb95d5194903a7ab2a6641f152bd0.jpg'

    const handleLogout = () => {
        dispatch(logoutAction())
    }

    const handleClick = () => {
        navigate(LOGIN_ROUTE)
    }

    return (
        <header className='header'>
            <div className='header__nav'>
                <Link className='header__link' to={EAST_ROUTE}>logo</Link>
                {isAuth ? (
                    <>
                        <ul className='header__list'>
                            <li className='header__item'><Link className='header__item__link' to={DASHBOARD_ROUTE}>Дашборд</Link></li>
                            <li className='header__item'><Link className='header__item__link' to={DASHBOARD_ROUTE}>О нас</Link></li>
                        </ul>
                        <div className='header__profile'>
                            <img src={avatar} alt="Профиль фото" style={{ width: '25px', height: '25px', borderRadius: '50%' }} />
                            <button className='header__button' type='button' onClick={handleLogout}>Выйти</button>
                        </div>
                    </>
                ) : (
                    <div className='header__profile'>
                        <button className='header__button' onClick={handleClick}>Войти</button>
                    </div>

                )}
            </div>
        </header>
    )
        ;
};

export default Header;