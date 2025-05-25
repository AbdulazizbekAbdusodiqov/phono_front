import React from 'react'
import style from "./Footer.module.scss"

import { FaYoutube } from 'react-icons/fa';
import { FaVk,FaSquareOdnoklassniki,  FaTelegram } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.line}/>
            <div className={style.container}>
                <div className={style.footer__top}>
                    <div className={style.footer__brand}>Phono</div>
                    <div className={style.footer__columns}>
                        <ul>
                            <li>Мобильное приложение</li>
                            <li>Помощь</li>
                            <li>Платные услуги</li>
                            <li>Реклама на сайте</li>
                        </ul>
                        <ul>
                            <li>Условия использования</li>
                            <li>Политика конфиденциальности</li>
                            <li>Партнеры</li>
                            <li>Как продавать и покупать?</li>
                        </ul>
                        <ul>
                            <li>Правила безопасности</li>
                            <li>Карта сайта</li>
                            <li>Карта регионов</li>
                            <li>Карьера в Phono</li>
                        </ul>
                    </div>
                    <div className={style.footer__store_social}>
                        <img src="/AppStore.png" alt="App Store" className={style.footer__store_badge} />
                        <div className={style.footer__social_icons}>
                            <FaYoutube color='red' size={30}/>
                            <FaVk color='#0077ff' size={30}/>
                            <FaTelegram color='#34aadf'size={30}/>
                            <FaSquareOdnoklassniki color='#f7931e'size={30}/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}


export default Footer