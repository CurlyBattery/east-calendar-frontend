import {useEffect, useState} from "react";
import {checkStatusQr, getQr} from "../../http/auth.api.ts";
import {type IQRSession, QrStatus} from "../../types/user.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {meAction} from "../../store/reducers/auth/action-creators.ts";
import {useNavigate} from "react-router-dom";
import {DASHBOARD_ROUTE} from "../../utils/consts.ts";

const QrCodeLoginPage = () => {
    const  dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {user} = useAppSelector(state => state.auth)

    const [qr, setQr] = useState<string | undefined>();
    const [tkn, setTkn] = useState<string | undefined>();
    const [session, setSession] = useState<IQRSession | undefined>();

    useEffect(() => {
        if(user) {
            navigate(DASHBOARD_ROUTE)
        }
    }, [user]);


    useEffect(() => {
        const fetchQr = async () => {
            try {
                const {qrCode, token } = await getQr();
                const reader = new FileReader();
                reader.onloadend = function() {
                    setQr(reader.result as string);
                };
                setTkn(token)
                reader.readAsDataURL(qrCode);
            } catch (error) {
                console.error("Ошибка при получении QR-кода:", error);
                setQr(undefined);
            }
        };
        fetchQr();
    }, []);

    useEffect(() => {
        if (tkn) {
            const pollStatus = async () => {
                try {
                    const response = await checkStatusQr(tkn);
                    setSession(response.session);
                    if(response.session.status === QrStatus.SUCCESS) {
                        dispatch(meAction());
                    }
                    if (response.session.status === QrStatus.SUCCESS || response.session.status === QrStatus.REJECT) {
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Ошибка при проверке статуса:", error);
                    return true;
                }
            };
            const intervalId = setInterval(async () => {
                const stopPolling = await pollStatus();
                if (stopPolling) {
                    clearInterval(intervalId);
                }
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [tkn]);
    return (
        <div>
            Отсканируйте QrCode <br/>

            {qr ? (
                <img src={qr} alt="QRCode"/>
            ) : (
                <p>Загрузка...</p>
            )}
            {tkn && <div>{tkn}</div>}
            {session && <div>{session.status}</div>}
        </div>
    );
};

export default QrCodeLoginPage;
