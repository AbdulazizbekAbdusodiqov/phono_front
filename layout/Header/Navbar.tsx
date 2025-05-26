import React from 'react'
import style from "./Navbar.module.scss"
import Button from '../../components/Button/Button'
import { FaRegEnvelopeOpen, FaRegHeart,FaRegUser,FaChevronDown } from "react-icons/fa6";
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className={style.header}>
            <div className={style.container}>
                <h1 className={style.h1}>Phono</h1>
                <div className={style.right}>
                    <div className={style.navigations}>
                        <div>
                            <FaRegEnvelopeOpen  color='#fff'/>
                            Сообщения
                        </div>
                        <FaRegHeart  color='#fff'/>
                        <div>
                            <FaRegUser color='#fff'/>
                            Ваш профиль
                            <FaChevronDown color='#fff'/>
                        </div>
                    </div>
                    <Link href="/CreateProduct">
                        <Button variant="secondary">Добавить объявление</Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar