import {useEffect} from "react";

import { createPayment} from "../../http/payment.api.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {PlanUser} from "../../types/user.ts";
import {checkPayloadAction} from "../../store/reducers/auth/action-creators.ts";
import './_premium.scss';

const PremiumPage = () => {
    const {user} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkPayloadAction())
    }, []);

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        const { confirmation } = await createPayment();
        window.location.href = confirmation?.confirmation_url;

        if(confirmation) {
            window.location.href = confirmation?.confirmation_url;
        }
    }

    return (
        <div className='premium'>
            {user?.plan?.subscriptionPlan === PlanUser.PRO ?
                (
                    <div className='premium__active'>
                        <div className='premium__active__icon'></div>
                        <div className='premium__active__title'>Подписка активирована</div>
                        <p className='premium__active__description'>Вы получили доступ ко всем премиум функциям EastCalendar</p>

                        <div className='premium__active__features'>
                            <div className='premium__active__features__feature'>
                                <div className='premium__active__features__feature__icon'></div>
                                <div className='premium__active__features__feature__title'>Неограниченно участников
                                </div>
                                <div className='premium__active__features__feature__description'>Добавляйте любое
                                    количество людей в проекты
                                </div>
                            </div>
                            <div className='premium__active__features__feature'>
                                <div className='premium__active__features__feature__icon'></div>
                                <div className='premium__active__features__feature__title'>Расширенная аналитика
                                </div>
                                <div className='premium__active__features__feature__description'>Детальные отчеты и
                                    статистика
                                </div>
                            </div>
                            <div className='premium__active__features__feature'>
                                <div className='premium__active__features__feature__icon'></div>
                                <div className='premium__active__features__feature__title'>Приоритетная поддержка
                                </div>
                                <div className='premium__active__features__feature__description'>Быстрые ответы на ваши вопросы
                                </div>
                            </div>

                        </div>
                    </div>
                )
                :
                (
                    <div className='premium__selection'>
                        <div className='premium__selection__header'>
                            <div className='premium__selection__header__badge'>Premium</div>
                            <h1 className='premium__selection__header__title'>Выберите ваш план</h1>
                            <p className='premium__selection__header__subtitle'>Получите полные доступ к возможностям EastCalendar и управляйте проектами на новом уровне</p>
                        </div>
                        <div className='premium__selection__plans'>
                            <div className='premium__selection__plans__card'>
                                <div className='premium__selection__plans__card__header'>
                                    <h3 className='premium__selection__plans__card__header__name'>Free</h3>
                                    <p className='premium__selection__plans__card__header__description'>Для личного использования</p>
                                </div>

                                <div className='premium__selection__plans__card__price'>
                                    <div className='premium__selection__plans__card__price__amount'>0<span>₽</span></div>
                                    <div className='premium__selection__plans__card__price__period'>Бесплатно навсегда</div>
                                </div>

                                <ul className='premium__selection__plans__card__features'>
                                    <li className='premium__selection__plans__card__features__feature'>Любое количество проектов</li>
                                    <li className='premium__selection__plans__card__features__feature'>Базовые задачи</li>
                                    <li className='premium__selection__plans__card__features__feature'>Календарь</li>
                                    <li className='premium__selection__plans__card__features__feature__disabled'>Расширенная аналитика</li>
                                    <li className='premium__selection__plans__card__features__feature__disabled'>Приоритетная поддержка</li>
                                </ul>

                                <button className='premium__selection__plans__card__button' disabled>Текущий план</button>
                            </div>
                            <div className='premium__selection__plans__card premium__selection__plans__card__pro'>
                                <div className='premium__selection__plans__card__header'>
                                    <h3 className='premium__selection__plans__card__header__name'>Pro</h3>
                                    <p className='premium__selection__plans__card__header__description'>Для команд и
                                        бизнеса</p>
                                </div>

                                <div className='premium__selection__plans__card__price'>
                                    <div className='premium__selection__plans__card__price__amount'>11<span>₽</span>
                                    </div>
                                    <div className='premium__selection__plans__card__price__period'>в месяц</div>
                                </div>

                                <ul className='premium__selection__plans__card__features'>
                                    <li className='premium__selection__plans__card__features__feature'>Неограниченное
                                        количество участников
                                    </li>
                                    <li className='premium__selection__plans__card__features__feature'>Все возможности
                                        задач
                                    </li>
                                    <li className='premium__selection__plans__card__features__feature'>Расширенный
                                        календарь
                                    </li>
                                    <li className='premium__selection__plans__card__features__feature'>Детальная
                                        аналитика
                                    </li>
                                    <li className='premium__selection__plans__card__features__feature'>Приоритетная
                                        поддержка 24/7
                                    </li>
                                    <li className='premium__selection__plans__card__features__feature'>Экспорт данных
                                    </li>
                                    <li className='premium__selection__plans__card__features__feature'>Кастомизация</li>
                                </ul>

                                <form onSubmit={(e) => handleClick(e)}>
                                    <button className='premium__selection__plans__card__button premium__selection__plans__card__button__pro' type='submit'>Оплатить подписку</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default PremiumPage;
