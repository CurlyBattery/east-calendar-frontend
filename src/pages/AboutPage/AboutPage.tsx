import { FaRegNewspaper } from "react-icons/fa";
import { MdOutlineRememberMe } from "react-icons/md";
import { MdOutlineHighQuality } from "react-icons/md";
import './_about.scss';

const AboutPage = () => {
    return (
        <div className="about">
            <div className="about__container">
                <section className="about__header about-page__header">
                    <div className="about__header-content">
                        <h1 className="about__title">
                            О Нас: Вдохновляемся Будущим. Кодируем Сегодня.
                        </h1>
                        <p className="about__subtitle">
                            Мы — команда разработчиков, дизайнеров и стратегов, объединённых страстью к созданию высокопроизводительных и интуитивно понятных цифровых продуктов. Наша миссия — преобразовывать идеи в реальность.
                        </p>
                    </div>
                </section>

                <section className="about__stats about-page__values">
                    <div className="about__stat-card">
                        <div className="about__stat-icon" style={{ color: '#ffffff' }}>
                            <FaRegNewspaper />
                        </div>
                        <div className="about__stat-info">
                            <p className="about__stat-value">Инновации</p>
                            <p className="about__stat-label">Всегда в поиске прорывных решений</p>
                        </div>
                    </div>

                    <div className="about__stat-card">
                        <div className="about__stat-icon" style={{ color: '#ffffff' }}>
                            <MdOutlineRememberMe />
                        </div>
                        <div className="about__stat-info">
                            <p className="about__stat-value">Партнёрство</p>
                            <p className="about__stat-label">Прозрачное взаимодействие с клиентом</p>
                        </div>
                    </div>

                    <div className="about__stat-card">
                        <div className="about__stat-icon" style={{ color: '#ffffff' }}>
                            <MdOutlineHighQuality />
                        </div>
                        <div className="about__stat-info">
                            <p className="about__stat-value">Качество</p>
                            <p className="about__stat-label">Стремление к техническому совершенству</p>
                        </div>
                    </div>
                </section>

                <hr className="divider" />

                <section className="about__info-section about-page__details">
                    <h2 className="about__info-title">
                        Наш Подход к Разработке
                    </h2>
                    <ul className="about__info-list">
                        <li>Гибкая методология: Мы работаем по принципам Agile, чтобы гарантировать быструю обратную связь и адаптацию к меняющимся требованиям.</li>
                        <li>Современный стек: Используем React, NestJS для создания масштабируемых и надёжных систем.</li>
                    </ul>
                </section>

                <hr className="divider" />

                <section className="about__content">
                    <h2 className="about__title" style={{ fontSize: '30px', margin: '0 0 20px 0' }}>
                        Встречайте Наших Экспертов
                    </h2>
                    <ul className="about__list">

                        <li className="about__item">
                            <div className="about__item-icon">
                                <div className="about__item-icon-main" style={{ color: '#764ba2' }}>
                                </div>
                                <span className="about__item-badge">Основатель</span>
                            </div>
                            <div className="about__item-info">
                                <div className="about__item-header">
                                    <h3 className="about__item-name">Косырев Артём</h3>
                                    <span className="about__item-current-dot" title="На месте"></span>
                                </div>
                                <div className="about__item-details">
                                    <div className="about__item-detail">
                                        <span className="about__item-detail-text">Full-Stack Разработчик</span>
                                    </div>
                                    <div className="about__item-detail">
                                        <span className="about__item-detail-text">Город: Оренбург</span>
                                    </div>
                                </div>
                                <div className="about__item-agent">
                                    <span className="about__item-agent-label">Опыт и Фокус</span>
                                    <span className="about__item-agent-text">2+ лет опыта в проектах.</span>
                                </div>
                            </div>
                        </li>

                    </ul>
                </section>

            </div>
        </div>
    );
};

export default AboutPage;
