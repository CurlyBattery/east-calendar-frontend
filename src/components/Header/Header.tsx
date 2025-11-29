import {Link, useNavigate} from "react-router-dom";
import './_header.scss';

import { useAppSelector } from "../../hooks/redux.ts";
import {DASHBOARD_ROUTE, EAST_ROUTE, LOGIN_ROUTE, PREMIUM_ROUTE} from "../../utils/consts.ts";
import logo from '../../assets/images/cactus.png';
import {useState} from "react";
import ProfileModal from "../ProfileModal/ProfileModal.tsx";


const Header = () => {
    const navigate = useNavigate();
    const { isAuth, user } = useAppSelector(state => state.auth);
    const avatar = user?.avatarPath ? `http://localhost:5000/${user?.avatarPath}` : 'https://i.pinimg.com/736x/61/8e/b9/618eb95d5194903a7ab2a6641f152bd0.jpg'
    const [openModal, setOpenModal] = useState(false);

    const handleClick = () => {
        navigate(LOGIN_ROUTE)
    }

    const handleClickPremium = () => {
        navigate(PREMIUM_ROUTE)
    }


    const handleClickProfile = () => {
        setOpenModal(true);
    }

    return (
        <header className='header'>
            <div className='header__nav'>
                <Link className='header__nav__link' to={EAST_ROUTE}>
                    <img src={logo} alt="логотип"/>
                    <p>EastCalendar</p>
                </Link>
                {isAuth ? (
                    <>
                        <ul className='header__list'>
                            <li className='header__item'><Link className='header__item__link' to={DASHBOARD_ROUTE}>Дашборд</Link></li>
                            <li className='header__item'><Link className='header__item__link' to={DASHBOARD_ROUTE}>О нас</Link></li>
                        </ul>
                        <div className='header__profile'>
                            <button className='header__profile__button' type='button' onClick={handleClickPremium}>Premium</button>
                            <img
                                className='header__profile__image'
                                src={avatar}
                                alt="Профиль фото"
                                onClick={handleClickProfile}
                            />
                            <ProfileModal visible={openModal} setVisible={setOpenModal} />
                        </div>
                    </>
                ) : (
                    <div className='header__profile'>
                        <button className='header__profile__button' onClick={handleClick}>Войти</button>
                        <button className='header__profile__button' type='button' onClick={handleClickPremium}>Premium
                        </button>
                        <ProfileModal visible={openModal} setVisible={setOpenModal}/>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
