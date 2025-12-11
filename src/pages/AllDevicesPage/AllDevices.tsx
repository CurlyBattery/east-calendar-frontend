import { useEffect, useState } from "react";
import { getAllDevices } from "../../http/auth.api.ts";
import type { IDevice } from "../../types/user.ts";
import './_devices.scss';
import {useAppDispatch} from "../../hooks/redux.ts";
import {logoutByAgentAction} from "../../store/reducers/auth/action-creators.ts";

const AllDevices = () => {
    const dispatch = useAppDispatch();
    const [devices, setDevices] = useState<IDevice[] | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDevices = async () => {
        try {
            setIsLoading(true);
            const data = await getAllDevices();
            setDevices(data);
            setError(null);
        } catch (err) {
            setError('Не удалось загрузить список устройств');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {

        fetchDevices();
    }, []);

    const parseUserAgent = (userAgent: string) => {
        let browser = 'Неизвестный браузер';
        let browserIcon = '';

        if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
            browser = 'Google Chrome';
            browserIcon = '';
        } else if (userAgent.includes('Firefox')) {
            browser = 'Mozilla Firefox';
            browserIcon = '';
        } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
            browser = 'Safari';
            browserIcon = '';
        } else if (userAgent.includes('Edg')) {
            browser = 'Microsoft Edge';
            browserIcon = '';
        } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
            browser = 'Opera';
            browserIcon = '';
        }

        let os = 'Неизвестная ОС';
        let osIcon = '';

        if (userAgent.includes('Windows NT 10.0')) {
            os = 'Windows 10/11';
            osIcon = '';
        } else if (userAgent.includes('Windows')) {
            os = 'Windows';
            osIcon = '';
        } else if (userAgent.includes('Mac OS X')) {
            os = 'macOS';
            osIcon = '';
        } else if (userAgent.includes('Linux')) {
            os = 'Linux';
            osIcon = '';
        } else if (userAgent.includes('Android')) {
            os = 'Android';
            osIcon = '';
        } else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) {
            os = 'iOS';
            osIcon = '';
        }

        let deviceType = 'Компьютер';
        let deviceIcon = '';

        if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone')) {
            deviceType = 'Мобильное устройство';
            deviceIcon = '';
        } else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) {
            deviceType = 'Планшет';
            deviceIcon = '';
        }

        return { browser, browserIcon, os, osIcon, deviceType, deviceIcon };
    };

    const isCurrentDevice = (userAgent: string) => {
        return userAgent === navigator.userAgent;
    };

    const handleLogoutDevice = (userAgent: string) => {
        dispatch(logoutByAgentAction(userAgent));
        fetchDevices();
    };

    const handleLogoutAllDevices = () => {
        devices?.filter(d => !isCurrentDevice(d.userAgent)).map(d => {
            dispatch(logoutByAgentAction(d.userAgent));
        })
    };

    return (
        <div className="devices">
            <div className="devices__container">
                <div className="devices__header">
                    <div className="devices__header-content">
                        <h1 className="devices__title">Активные устройства</h1>
                        <p className="devices__subtitle">
                            Управляйте устройствами, на которых выполнен вход в ваш аккаунт
                        </p>
                    </div>
                    {devices && devices.length > 1 && (
                        <button
                            className="devices__logout-all"
                            onClick={handleLogoutAllDevices}
                        >
                            Выйти со всех устройств
                        </button>
                    )}
                </div>

                {devices && devices.length > 0 && (
                    <div className="devices__stats">
                        <div className="devices__stat-card">
                            <div className="devices__stat-icon"></div>
                            <div className="devices__stat-info">
                                <div className="devices__stat-value">{devices.length}</div>
                                <div className="devices__stat-label">
                                    {devices.length === 1 ? 'Устройство' : 'Устройств'}
                                </div>
                            </div>
                        </div>
                        <div className="devices__stat-card">
                            <div className="devices__stat-icon"></div>
                            <div className="devices__stat-info">
                                <div className="devices__stat-value">
                                    {devices.filter(d => isCurrentDevice(d.userAgent)).length}
                                </div>
                                <div className="devices__stat-label">Текущее</div>
                            </div>
                        </div>
                        <div className="devices__stat-card">
                            <div className="devices__stat-icon"></div>
                            <div className="devices__stat-info">
                                <div className="devices__stat-value">Активна</div>
                                <div className="devices__stat-label">Безопасность</div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="devices__content">
                    {isLoading && (
                        <div className="devices__loading">
                            <div className="devices__loading-spinner"></div>
                            <p>Загрузка устройств...</p>
                        </div>
                    )}

                    {error && (
                        <div className="devices__error">
                            <div className="devices__error-icon"></div>
                            <h3>Ошибка загрузки</h3>
                            <p>{error}</p>
                        </div>
                    )}

                    {!isLoading && !error && devices && devices.length === 0 && (
                        <div className="devices__empty">
                            <div className="devices__empty-icon"></div>
                            <h3>Нет активных устройств</h3>
                            <p>В данный момент нет подключенных устройств</p>
                        </div>
                    )}

                    {!isLoading && !error && devices && devices.length > 0 && (
                        <ul className="devices__list">
                            {devices.map((device, index) => {
                                const deviceInfo = parseUserAgent(device.userAgent);
                                const isCurrent = isCurrentDevice(device.userAgent);

                                return (
                                    <li key={index} className="devices__item">
                                        <div className="devices__item-icon">
                                            <span className="devices__item-icon-main">
                                                {deviceInfo.deviceIcon}
                                            </span>
                                            {isCurrent && (
                                                <span className="devices__item-badge">
                                                    Текущее
                                                </span>
                                            )}
                                        </div>

                                        <div className="devices__item-info">
                                            <div className="devices__item-header">
                                                <h3 className="devices__item-name">
                                                    {deviceInfo.deviceType}
                                                </h3>
                                                {isCurrent && (
                                                    <span className="devices__item-current-dot"></span>
                                                )}
                                            </div>
                                            <div className="devices__item-details">
                                                <div className="devices__item-detail">
                                                    <span className="devices__item-detail-icon">
                                                        {deviceInfo.browserIcon}
                                                    </span>
                                                    <span className="devices__item-detail-text">
                                                        {deviceInfo.browser}
                                                    </span>
                                                </div>
                                                <div className="devices__item-detail">
                                                    <span className="devices__item-detail-icon">
                                                        {deviceInfo.osIcon}
                                                    </span>
                                                    <span className="devices__item-detail-text">
                                                        {deviceInfo.os}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="devices__item-agent">
                                                <span className="devices__item-agent-label">
                                                    User Agent:
                                                </span>
                                                <span className="devices__item-agent-text">
                                                    {device.userAgent}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="devices__item-actions">
                                            {!isCurrent && (
                                                <button
                                                    className="devices__item-logout"
                                                    onClick={() => handleLogoutDevice(device.userAgent)}
                                                >
                                                    Завершить сеанс
                                                </button>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="devices__info-section">
                    <h3 className="devices__info-title">Советы по безопасности</h3>
                    <ul className="devices__info-list">
                        <li>Регулярно проверяйте список активных устройств</li>
                        <li>Завершайте сеансы на устройствах, которыми больше не пользуетесь</li>
                        <li>Если вы видите неизвестное устройство, немедленно завершите сеанс и смените пароль</li>
                        <li>Используйте надежные пароли для защиты аккаунта</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AllDevices;