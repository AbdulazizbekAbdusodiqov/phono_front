import React from "react";
import style from "./Navbar.module.scss";
import Link from "next/link";
import Button from "../../components/Button/Button";
import {
  FaRegEnvelopeOpen,
  FaRegHeart,
  FaRegUser,
  FaChevronDown,
} from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className={style.header}>
      <div className={style.container}>
        <Link href={"/"}>
          <h1 className={style.h1}>Phono</h1>
        </Link>
        <div className={style.right}>
          <div className={style.navigations}>
            <div>
              <FaRegEnvelopeOpen size={18} color="#fff" />
              Сообщения
            </div>
            <FaRegHeart size={18} color="#fff" />
            <div>
              <FaRegUser size={18} color="#fff" />
              Ваш профиль
              <FaChevronDown color="#fff" />
            </div>
          </div>
          <Link href="/CreateProduct">
            <Button variant="secondary">Добавить объявление</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
