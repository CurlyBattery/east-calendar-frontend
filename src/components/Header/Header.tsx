import {Link, useNavigate} from "react-router-dom";
import './_header.scss';

import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {logoutAction} from "../../store/reducers/auth/action-creators.ts";
import {DASHBOARD_ROUTE, EAST_ROUTE, LOGIN_ROUTE} from "../../utils/consts.ts";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector(state => state.auth);

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
                        <button className='header__button' type='button' onClick={handleLogout}>Выйти</button>
                    </>
                ) : (
                    <button className='header__button' onClick={handleClick}>Войти</button>
                )}
            </div>
        </header>
    );
};

export default Header;