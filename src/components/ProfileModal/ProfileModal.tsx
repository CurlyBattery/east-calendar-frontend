import type {FC} from "react";
import Modal from "../Modal.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {logoutAction} from "../../store/reducers/auth/action-creators.ts";
import {useNavigate} from "react-router-dom";
import {ALL_DEVICES_ROUTE, PROFILE_ROUTE} from "../../utils/consts.ts";
import './_profile_modal.scss';

interface ProfileModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const ProfileModal: FC<ProfileModalProps> = ({ visible, setVisible }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);
    const avatar = user?.avatarPath ? `http://79.174.77.240/uploads/${user?.avatarPath}` : 'https://i.pinimg.com/736x/61/8e/b9/618eb95d5194903a7ab2a6641f152bd0.jpg'

    const handleLogout = () => {
        setVisible(false);
        dispatch(logoutAction())
    };

    const handleClickProfile = () => {
        setVisible(false);
        navigate(PROFILE_ROUTE);
    };

    const handleClickDevices = () => {
        setVisible(false);
        navigate(ALL_DEVICES_ROUTE);
    };

    return (
        <Modal visible={visible} setVisible={setVisible} position='top-right'>
            <div className='modal_profile'>
                <div className='modal_profile__header'>
                    <div className='modal_profile__header__info'>
                        <img src={avatar} className='modal_profile__header__info__avatar' alt="аватарка"/>
                        <div className='modal_profile__header__info__details'>
                            <div className='modal_profile__header__info__details__name'>{user?.name}</div>
                            <div className='modal_profile__header__info__details__email'>{user?.email}</div>
                        </div>
                    </div>
                </div>

                <div className='modal_profile__body'>
                    <button className='modal_profile__body__item' onClick={handleClickProfile}>
                        <span>Мой профиль</span>
                    </button>

                    <button className='modal_profile__body__item' onClick={handleClickDevices}>
                        <span>Устройства</span>
                    </button>
                </div>

                <div className='modal_profile__footer'>
                    <button className='modal_profile__footer__button' onClick={handleLogout}>
                        <span>Выйти</span>
                    </button>
                </div>
            </div>


        </Modal>
    );
};

export default ProfileModal;
