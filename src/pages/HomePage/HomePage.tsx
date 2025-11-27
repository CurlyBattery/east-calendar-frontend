import './_home.scss';
import scull from '../../assets/images/icons8-skull-64.png';

const HomePage = () => {
    return (
        <div className='home'>
            <section className='home__forest'>
                <div className="home__forest__left">
                    <img src={scull} alt="череп"/>
                </div>
                <div className="home__forest__right">
                    <div className="home__forest__right__block">
                        <h1 className="home__forest__right__block__title">Что это?</h1>
                        <p className='home__forest__right__block__description'>
                            Это вполне нормально
                        </p>
                    </div>
                </div>
            </section>
            <section className='home__teeth'>
                <ul className='home__teeth__list'>
                    <li className='home__teeth__list__item'>
                        <div className='home__teeth__list__item__card'>
                            <img src={scull} alt="череп"/>
                            <p className='home__teeth__list__item__card__text'>Надежность</p>
                        </div>
                    </li>
                    <li className='home__teeth__list__item'>
                        <div className='home__teeth__list__item__card'>
                            <img src={scull} alt="череп"/>
                            <p className='home__teeth__list__item__card__text'>Четкость</p>
                        </div>
                    </li>
                    <li className='home__teeth__list__item'>
                        <div className='home__teeth__list__item__card'>
                            <img src={scull} alt="череп"/>
                            <p className='home__teeth__list__item__card__text'>Правильность</p>
                        </div>
                    </li>
                </ul>
            </section>
            <section className='home__glass'>
                таблица
            </section>
            <section className='home__god'>
                список функционала
            </section>
        </div>
    );
};

export default HomePage;