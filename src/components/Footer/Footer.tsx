import './_footer.scss';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__container'>
                <div className='footer__container__copyright'>
                    <span>© 2025 EastCalendar.</span>
                    <span>Все права защищены</span>
                </div>
                <ul className='footer__container__links'>
                    <li><a href="#">Конфиденциальность</a></li>
                    <li><a href="#">Условия использования</a></li>
                    <li><a href="#">Cookies</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;