import { useState, useEffect } from "react";
import style from "./Navbar.module.scss";
import Link from "next/link";
import Button from "../../components/Button/Button";
import {
  FaRegEnvelopeOpen,
  FaRegHeart,
  FaRegUser,
  FaChevronDown,
  FaBars,
  FaXmark,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { getLocalStorage } from "../../utils/local-storege";
import { DropDown } from "./components";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const token = getLocalStorage("accessToken");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest(`.${style.container}`)) {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 770 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={style.header}>
      <div className={style.container}>
        <Link href={"/"} className={style.logo}>
          <h1 className={style.h1}>Phono</h1>
        </Link>

        <button
          className={style.menuButton}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
        </button>

        <div className={`${style.right} ${isMenuOpen ? style.showMenu : ""}`}>
          <div className={style.navigations}>
            <Link
              href={{ pathname: '/Profile', query: { tab: 'Сообщения' } }}
              onClick={closeMenu}
            >
              <div className={style.navItem}>
                <FaRegEnvelopeOpen size={18} />
                <span>Сообщения</span>
              </div>
            </Link>

            <Link
              href={token && isAuthenticated ? "/favorites" : "/login"}
              onClick={closeMenu}
            >
              <div className={style.navItem}>
                <FaRegHeart size={18} />
                <span>Избранное</span>
              </div>
            </Link>

            <Link
              href={token && isAuthenticated ? isMenuOpen ? "/Profile?tab=Объявления" : "" : "/login"}
              onClick={closeMenu}
            >
              <div className={style.navItem}>
                {!isMenuOpen ?
                  <DropDown />
                  :
                  <>
                    <FaRegUser size={18} />
                    <span>Ваш профиль</span>
                  </>
                }
              </div>
            </Link>
          </div>

          <div className={style.buttonWrapper}>
            <Link
              href={token && isAuthenticated ? "/CreateProduct" : "/login"}
              onClick={closeMenu}
            >
              <Button variant="secondary">Добавить объявление</Button>
            </Link>
          </div>
        </div>

        {isMenuOpen && <div className={style.overlay} onClick={closeMenu} />}
      </div>
    </nav>
  );
};

export default Navbar;
