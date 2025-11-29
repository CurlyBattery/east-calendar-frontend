import './_home.scss';
import grophone from '../../assets/images/grophone.png';
import clock from '../../assets/images/clock.png';
import work from '../../assets/images/work.png';
import blank from '../../assets/images/blank.png';

const HomePage = () => {
    return (
        <div className='home'>
            <section className='home__forest'>
                <div className="home__forest__left">
                    <img src={grophone} alt="Громофон"/>
                </div>
                <div className="home__forest__right">
                    <div className="home__forest__right__block">
                        <h1 className="home__forest__right__block__title">Что это?</h1>
                        <p className='home__forest__right__block__description'>
                            EastCalendar - <i>это простой и удобный календарь для личных и командных задач. Управляй
                            временем,
                            ставь приоритеты и получай напоминания - всё в одном месте.</i>
                        </p>
                    </div>
                </div>
            </section>
            <section className='home__teeth'>
                <ul className='home__teeth__list'>
                    <li className='home__teeth__list__item'>
                        <div className='home__teeth__list__item__card'>
                            <img src={clock} alt="часы"/>
                            <p className='home__teeth__list__item__card__text'>Быстрое создание проектов</p>
                        </div>
                    </li>
                    <li className='home__teeth__list__item'>
                        <div className='home__teeth__list__item__card'>
                            <img src={work} alt="работа"/>
                            <p className='home__teeth__list__item__card__text'>Совместная работа</p>
                        </div>
                    </li>
                    <li className='home__teeth__list__item'>
                        <div className='home__teeth__list__item__card'>
                            <img src={blank} alt="бланк"/>
                            <p className='home__teeth__list__item__card__text'>Управление задачами</p>
                        </div>
                    </li>
                </ul>
            </section>
            <section className='home__glass'>
                <table className='home__glass__table'>
                    <thead>
                        <tr className='home__glass__table__header'>
                            <th className='home__glass__table__header__red'>Подписка</th>
                            <th className='home__glass__table__header__blue'>Описание</th>
                            <th className='home__glass__table__header__green'>Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='home__glass__table__row'>
                            <td>Free</td>
                            <td>Для личного использования — организуй день, учёбу, тренировки</td>
                            <td>0₽</td>
                        </tr>
                    <tr className='home__glass__table__row'>
                        <td>Pro</td>
                        <td>Для команд — планируйте совместные проекты</td>
                        <td>300₽</td>
                    </tr>
                    <tr className='home__glass__table__row'>
                        <td>Business</td>
                        <td>Для бизнеса — календарь с управлением доступом и аналитикой</td>
                        <td>999₽</td>
                    </tr>
                    </tbody>
                </table>
            </section>
            <section className='home__god'>
                <ul className='home__god__list'>
                    <li className='home__god__list__item'>Создание задач с приоритетами и дедлайнами</li>
                    <li className='home__god__list__item'>Доска задач с drag-and-drop колонками</li>
                    <li className='home__god__list__item'>Назначение исполнителя и наблюдателей</li>
                    <li className='home__god__list__item'>История изменений задачи (activity log)</li>
                    <li className='home__god__list__item'>Поиск, фильтры и сортировка</li>
                </ul>
            </section>
        </div>
    );
};

export default HomePage;
