import type {FC} from "react";
import Modal, {type ModalPosition} from "../Modal.tsx";
import {useAppDispatch} from "../../hooks/redux.ts";
import {logoutAction} from "../../store/reducers/auth/action-creators.ts";
import {useNavigate} from "react-router-dom";
import {ALL_DEVICES_ROUTE} from "../../utils/consts.ts";

interface ProfileModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    position?: ModalPosition;
}

const ProfileModal: FC<ProfileModalProps> = ({ visible, setVisible }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logoutAction())
    };

    const handleClick = () => {
        navigate(ALL_DEVICES_ROUTE);
    }

    return (
        <Modal visible={visible} setVisible={setVisible} width={100} height={100}>
            <button onClick={handleClick} type='button'>Устройства</button>
            <button className='header__button' type='button' onClick={handleLogout}>Выйти</button>
        </Modal>
    );
};

export default ProfileModal;
