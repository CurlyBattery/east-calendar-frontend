import {useParams} from "react-router-dom";
import {qrConfirm} from "../../http/auth.api.ts";
import {QrStatus} from "../../types/user.ts";

type ScanPageParams = {
    sessionId: string;
}


const ScanPage = () => {
    const { sessionId } = useParams<ScanPageParams>();

    const handleYes = async () => {
        await qrConfirm(sessionId as string, QrStatus.SUCCESS)
    };

    const handleNo = async () => {
        await qrConfirm(sessionId as string, QrStatus.REJECT)
    };

    return (
        <div>
            Вы хотите войти в аккаунт на новом устройстве?
            <button onClick={handleYes} type='button'>Да, войти</button>
            <button onClick={handleNo} type='button'>Нет, отменить</button>
            {sessionId}
        </div>
    );
};

export default ScanPage;
