import { GiCrown } from "react-icons/gi";

import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import { PlanUser } from "../../types/user.ts";
import './_profile.scss';
import {logoutAction} from "../../store/reducers/auth/action-creators.ts";

const MyProfilePage = () => {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector(state => state.auth);
    console.log(user);
    const avatar = user?.avatarPath ? `http://79.174.77.240/uploads/${user?.avatarPath}` : 'https://i.pinimg.com/736x/61/8e/b9/618eb95d5194903a7ab2a6641f152bd0.jpg'

    const formatDate = (date?: Date) => {
        if (!date) return 'Не указано';
        return new Date(date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isPro = user?.plan?.subscriptionPlan === PlanUser.PRO;

    const handleLogout = () => {
        dispatch(logoutAction())
    };


    return (
        <div className='profile'>
            <div className='profile__container'>
                <div className='profile__header'>
                    <div className='profile__header-bg'></div>
                    <div className='profile__header-content'>
                        <div className='profile__avatar-wrapper'>
                            <img src={avatar} alt="аватарка" className='profile__avatar profile__avatar--placeholder'/>
                        </div>
                        <div className='profile__header-info'>
                            <h1 className='profile__name'>{user?.name || 'Имя не указано'}</h1>
                            <p className='profile__email'>{user?.email || 'Email не указан'}</p>
                            <div className='profile__badges'>
                                <span className={`profile__plan-badge ${isPro ? 'profile__plan-badge--pro' : 'profile__plan-badge--free'}`}>
                                    {isPro ? 'PRO' : 'FREE'}
                                </span>
                                <span className='profile__date-badge'>
                                    Регистрация: {formatDate(user?.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='profile__content'>
                    <div className='profile__section'>
                        <div className='profile__section-header'>
                            <h2 className='profile__section-title'>Подписка</h2>
                            {!isPro && (
                                <button className='profile__upgrade-btn'>
                                    Обновить до PRO
                                </button>
                            )}
                        </div>
                        <div className='profile__plan-card'>
                            <div className='profile__plan-info'>
                                <div className='profile__plan-icon'>
                                    {isPro ? <GiCrown /> : '📦'}
                                </div>
                                <div className='profile__plan-details'>
                                    <h3 className='profile__plan-name'>
                                        {isPro ? 'PRO Plan' : 'Free Plan'}
                                    </h3>
                                    <p className='profile__plan-description'>
                                        {isPro
                                            ? 'Полный доступ ко всем функциям'
                                            : 'Базовые возможности платформы'
                                        }
                                    </p>
                                </div>
                            </div>
                            {isPro && user?.plan?.isExpired && (
                                <div className='profile__plan-expiry'>
                                    <span className='profile__plan-expiry-label'>Действует до:</span>
                                    <span className='profile__plan-expiry-date'>
                                        {formatDate(user.plan.isExpired)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className='profile__features'>
                            <h3 className='profile__features-title'>Ваши возможности:</h3>
                            <ul className='profile__features-list'>
                                <li className='profile__feature-item profile__feature-item--active'>
                                    <span className='profile__feature-icon'>✓</span>
                                    Неограниченное количество проектов
                                </li>
                                <li className='profile__feature-item profile__feature-item--active'>
                                    <span className='profile__feature-icon'>✓</span>
                                    Календарь и задачи
                                </li>
                                {isPro ? (
                                    <>
                                        <li className='profile__feature-item profile__feature-item--active'>
                                            <span className='profile__feature-icon'>✓</span>
                                            Неограниченное количество участников
                                        </li>
                                        <li className='profile__feature-item profile__feature-item--active'>
                                            <span className='profile__feature-icon'>✓</span>
                                            Расширенная аналитика
                                        </li>
                                        <li className='profile__feature-item profile__feature-item--active'>
                                            <span className='profile__feature-icon'>✓</span>
                                            Приоритетная поддержка 24/7
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className='profile__feature-item profile__feature-item--disabled'>
                                            <span className='profile__feature-icon'>✗</span>
                                            Неограниченное количество участников
                                        </li>
                                        <li className='profile__feature-item profile__feature-item--disabled'>
                                            <span className='profile__feature-icon'>✗</span>
                                            Расширенная аналитика
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className='profile__section'>
                        <h2 className='profile__section-title'>Настройки профиля</h2>
                        <div className='profile__settings'>
                            <div className='profile__setting-item'>
                                <div className='profile__setting-info'>
                                    <h4 className='profile__setting-label'>Имя</h4>
                                    <p className='profile__setting-value'>{user?.name}</p>
                                </div>
                                <button className='profile__setting-btn'>Изменить</button>
                            </div>
                            <div className='profile__setting-item'>
                                <div className='profile__setting-info'>
                                    <h4 className='profile__setting-label'>Email</h4>
                                    <p className='profile__setting-value'>{user?.email}</p>
                                </div>
                                <button className='profile__setting-btn'>Изменить</button>
                            </div>
                            <div className='profile__setting-item'>
                                <div className='profile__setting-info'>
                                    <h4 className='profile__setting-label'>Пароль</h4>
                                    <p className='profile__setting-value'>••••••••</p>
                                </div>
                                <button className='profile__setting-btn'>Изменить</button>
                            </div>
                        </div>
                    </div>

                    <div className='profile__section profile__section--danger'>
                        <h2 className='profile__section-title'>Опасная зона</h2>
                        <div className='profile__danger-actions'>
                            <div className='profile__danger-item'>
                                <div className='profile__danger-info'>
                                    <h4 className='profile__danger-title'>Выход из аккаунта</h4>
                                    <p className='profile__danger-description'>
                                        Вы будете перенаправлены на страницу входа
                                    </p>
                                </div>
                                <button className='profile__danger-btn profile__danger-btn--warning' onClick={handleLogout}>
                                    Выйти
                                </button>
                            </div>
                            <div className='profile__danger-item'>
                                <div className='profile__danger-info'>
                                    <h4 className='profile__danger-title'>Удалить аккаунт</h4>
                                    <p className='profile__danger-description'>
                                        Это действие нельзя отменить. Все ваши данные будут удалены.
                                    </p>
                                </div>
                                <button className='profile__danger-btn profile__danger-btn--danger'>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;
