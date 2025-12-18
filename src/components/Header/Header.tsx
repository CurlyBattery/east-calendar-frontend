import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

import { useAppSelector } from "../../hooks/redux.ts";
import {
    ABOUT_ROUTE,
    DASHBOARD_ROUTE,
    EAST_ROUTE,
    LOGIN_ROUTE,
    MY_TASKS_ROUTE,
    PREMIUM_ROUTE
} from "../../utils/consts.ts";
import logo from '../../assets/images/cactus.png';
import burger from '../../assets/images/burger.png';
import ProfileModal from "../ProfileModal/ProfileModal.tsx";
import './_header.scss';


const Header = () => {
    const navigate = useNavigate();
    const { isAuth, user } = useAppSelector(state => state.auth);
    const avatar = user?.avatarPath ? `${import.meta.env.VITE_API_URL}/${user?.avatarPath}` : 'https://i.pinimg.com/736x/61/8e/b9/618eb95d5194903a7ab2a6641f152bd0.jpg'
    const [openModal, setOpenModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {
        navigate(LOGIN_ROUTE)
    };

    const handleClickPremium = () => {
        navigate(PREMIUM_ROUTE)
    };

    const handleClickProfile = () => {
        setOpenModal(true);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    }

    return (
        <header className='header'>
            <div className='header__nav'>
                <Link className='header__nav__link' to={EAST_ROUTE}>
                    <img src={logo} alt="логотип"/>
                    <p>EastCalendar</p>
                </Link>
                <button
                    className={`header__burger ${menuOpen ? 'header__burger--active' : ''}`}
                    onClick={toggleMenu}
                    aria-label='Меню'
                >
                    <img src={burger} alt="бургер"/>
                </button>
                {isAuth ? (
                    <>
                        <ul className='header__list'>
                            <li className='header__item'><Link className='header__item__link'
                                                               to={DASHBOARD_ROUTE}>Дашборд</Link></li>
                            <li className='header__item'><Link className='header__item__link' to={MY_TASKS_ROUTE}>Мои
                                задачи</Link></li>
                            <li className='header__item'><Link className='header__item__link' to={ABOUT_ROUTE}>О
                                нас</Link></li>
                        </ul>
                        <div className='header__profile'>
                            <button className='header__profile__button' type='button'
                                    onClick={handleClickPremium}>Premium
                            </button>
                            <img
                                className='header__profile__image'
                                src={avatar}
                                alt="Профиль фото"
                                onClick={handleClickProfile}
                            />
                        </div>


                        <div
                            className={`header__mobile ${menuOpen ? 'header__mobile--open' : ''}`}
                        >
                            <div className='header__mobile__user'>
                                <img
                                    className='header__mobile__user__avatar'
                                    src={avatar}
                                    alt="пользователь"
                                    onClick={() => {
                                        handleClickProfile();
                                        closeMenu();
                                    }}
                                />
                                <span className='header__mobile__user__name'>
                                    {user?.name}
                                </span>
                            </div>
                            <nav className='header__mobile__nav'>
                                <Link
                                    to={DASHBOARD_ROUTE}
                                    onClick={closeMenu}
                                    className='header__mobile__nav__link'
                                >Дашборд</Link>
                                <Link
                                    to={MY_TASKS_ROUTE}
                                    onClick={closeMenu}
                                    className='header__mobile__nav__link'
                                >Мои задачи</Link>
                                <Link
                                    to={ABOUT_ROUTE}
                                    onClick={closeMenu}
                                    className='header__mobile__nav__link'
                                >О нас</Link>
                                <button
                                    onClick={() => {
                                        handleClickPremium();
                                        closeMenu();
                                    }}
                                    className='header__mobile__nav__button'
                                >
                                    Premium
                                </button>
                            </nav>
                        </div>


                    </>
                ) : (
                    <>
                        <div
                            className={`header__mobile ${menuOpen ? 'header__mobile--open' : ''}`}
                        >
                            <nav className='header__mobile__nav'>
                                <Link
                                    to={LOGIN_ROUTE}
                                    onClick={closeMenu}
                                    className='header__mobile__nav__link'
                                >Войти</Link>
                                <button
                                    onClick={() => {
                                        handleClickPremium();
                                        closeMenu();
                                    }}
                                    className='header__mobile__nav__button'
                                >
                                    Premium
                                </button>
                            </nav>
                        </div>
                        <div className='header__profile'>
                            <button className='header__profile__button' onClick={handleClick}>Войти</button>
                            <button className='header__profile__button' type='button'
                                    onClick={handleClickPremium}>Premium
                            </button>
                        </div>
                    </>

                )}
                {menuOpen && (
                    <div
                        className='header__overlay'
                        onClick={closeMenu}
                    />
                )}

                <ProfileModal visible={openModal} setVisible={setOpenModal}/>
            </div>
        </header>
    );
};

export default Header;
