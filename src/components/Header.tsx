import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {logoutAction} from "../store/reducers/auth/action-creators.ts";
import {Link, useNavigate} from "react-router-dom";
import {DASHBOARD_ROUTE, EAST_ROUTE} from "../utils/consts.ts";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logoutAction())
    }

    const handleClick = () => {
        navigate('/login')
    }

    return (
        <header>
            <Link to={EAST_ROUTE}>Header</Link>
            {isAuth ? (
                <div>
                    <ul>
                        <li><Link to={DASHBOARD_ROUTE}>Dashboard</Link></li>
                    </ul>
                    <button type='button' onClick={handleLogout}>Выйти</button>
                </div>
            ) : (
                <div>
                    <button onClick={handleClick}>Войти</button>
                </div>
            )}
        </header>
    );
};

export default Header;