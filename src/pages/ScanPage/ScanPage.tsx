import {useNavigate, useParams} from "react-router-dom";
import { MdQrCodeScanner } from "react-icons/md";

import {qrConfirm} from "../../http/auth.api.ts";
import {QrStatus} from "../../types/user.ts";
import './_scan.scss';

type ScanPageParams = {
    sessionId: string;
}


const ScanPage = () => {
    const navigate = useNavigate();
    const { sessionId } = useParams<ScanPageParams>();

    const handleYes = async () => {
        await qrConfirm(sessionId as string, QrStatus.SUCCESS);
        navigate('/dashboard');
    };

    const handleNo = async () => {
        await qrConfirm(sessionId as string, QrStatus.REJECT);
        navigate('/dashboard');
    };

    return (
        <div className='scan'>
            <div className='scan__container'>
                <div className='scan__container__icon'>
                    <MdQrCodeScanner/>
                </div>

                <div className='scan__container__title'>Подверждение входа</div>

                <p className='scan__container__description'>
                    Вы пытаетесь войти в свой аккаунт EastCalendar на новом устройстве.
                    Подтвердите, что это действительно вы.
                </p>

                <div className='scan__container__actions'>
                    <button
                        onClick={handleYes}
                        type='button'
                        className='scan__container__actions__button scan__container__actions__button__confirm'
                    >
                        ✓ Да, это я
                    </button>
                    <button
                        onClick={handleNo}
                        type='button'
                        className='scan__container__actions__button scan__container__actions__button__cancel'
                    >
                        ✕ Нет, отменить
                    </button>
                </div>

                <div className='scan__container__info'>
                    Если это были не вы немедленно нажмите "Отменить"
                    и сменить пароль.
                </div>
            </div>
        </div>
    );
};

export default ScanPage;
