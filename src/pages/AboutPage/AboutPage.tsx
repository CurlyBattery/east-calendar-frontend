import './_about.scss';

const AboutPage = () => {
    return (
        <div className="devices about-page-custom">
            <div className="devices__container">

                <section className="devices__header about-page__header">
                    <div className="devices__header-content">
                        <h1 className="devices__title">
                            О Нас: Вдохновляемся Будущим. Кодируем Сегодня.
                        </h1>
                        <p className="devices__subtitle">
                            Мы — команда разработчиков, дизайнеров и стратегов, объединённых страстью к созданию высокопроизводительных и интуитивно понятных цифровых продуктов. Наша миссия — преобразовывать идеи в реальность.
                        </p>
                    </div>
                </section>

                <section className="devices__stats about-page__values">
                    <div className="devices__stat-card">
                        <div className="devices__stat-icon" style={{ color: '#667eea' }}>
                        </div>
                        <div className="devices__stat-info">
                            <p className="devices__stat-value">Инновации</p>
                            <p className="devices__stat-label">Всегда в поиске прорывных решений</p>
                        </div>
                    </div>

                    <div className="devices__stat-card">
                        <div className="devices__stat-icon" style={{ color: '#6bcf7f' }}>
                        </div>
                        <div className="devices__stat-info">
                            <p className="devices__stat-value">Партнёрство</p>
                            <p className="devices__stat-label">Прозрачное взаимодействие с клиентом</p>
                        </div>
                    </div>

                    <div className="devices__stat-card">
                        <div className="devices__stat-icon" style={{ color: '#ff6b6b' }}>
                        </div>
                        <div className="devices__stat-info">
                            <p className="devices__stat-value">Качество</p>
                            <p className="devices__stat-label">Стремление к техническому совершенству</p>
                        </div>
                    </div>
                </section>

                <hr className="divider" />

                <section className="devices__info-section about-page__details">
                    <h2 className="devices__info-title">
                        Наш Подход к Разработке
                    </h2>
                    <ul className="devices__info-list">
                        <li>Гибкая методология: Мы работаем по принципам Agile, чтобы гарантировать быструю обратную связь и адаптацию к меняющимся требованиям.</li>
                        <li>Современный стек: Используем React, Node.js, Python и облачные технологии для создания масштабируемых и надёжных систем.</li>
                    </ul>
                </section>

                <hr className="divider" />

                <section className="devices__content">
                    <h2 className="devices__title" style={{ fontSize: '30px', margin: '0 0 20px 0' }}>
                        Встречайте Наших Экспертов
                    </h2>
                    <ul className="devices__list">

                        <li className="devices__item">
                            <div className="devices__item-icon">
                                <div className="devices__item-icon-main" style={{ color: '#764ba2' }}>
                                </div>
                                <span className="devices__item-badge">Основатель</span>
                            </div>
                            <div className="devices__item-info">
                                <div className="devices__item-header">
                                    <h3 className="devices__item-name">Косырев Артём</h3>
                                    <span className="devices__item-current-dot" title="На месте"></span>
                                </div>
                                <div className="devices__item-details">
                                    <div className="devices__item-detail">
                                        <span className="devices__item-detail-text">Full-Stack Разработчик</span>
                                    </div>
                                    <div className="devices__item-detail">
                                        <span className="devices__item-detail-text">Город: Оренбург</span>
                                    </div>
                                </div>
                                <div className="devices__item-agent">
                                    <span className="devices__item-agent-label">Опыт и Фокус</span>
                                    <span className="devices__item-agent-text">2+ лет опыта в проектах.</span>
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