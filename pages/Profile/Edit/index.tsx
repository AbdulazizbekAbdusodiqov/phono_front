import { useState } from "react"
import styles from "./Edit.module.scss"
import Image from "next/image"
import Breadcrumb from "@/components/Breadcrumb"
import { EditIcon, FavoriteIcon, LeftNavIcon, LocationIcon, RightNavIcon, TopIcon } from "@/public/icons/profile"

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div className={styles.detailsPage}>
      <div className={styles.breadcrumbs}>
        <Breadcrumb />
      </div>

      <div className={styles.container}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <Image src="/img/edit/Rectangle-5.png" alt="iPhone" width={500} height={500} className={styles.mainImg} />
            <div className={styles.imageControls}>
              <button className={styles.navButton}><LeftNavIcon /></button>
              <button className={styles.navButton}><RightNavIcon /></button>
            </div>
            <div className={styles.indicators}>
              <span></span>
              <span></span>
              <span className={styles.active}></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={styles.thumbnails}>
            <Image src="/img/edit/Rectangle-6.png" alt="iPhone" width={100} height={100} className={styles.thumbnail} />
            <Image src="/img/edit/Rectangle-7.png" alt="iPhone" width={100} height={100} className={styles.thumbnail} />
            <Image src="/img/edit/Rectangle-8.png" alt="iPhone" width={100} height={100} className={styles.thumbnail} />
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.header}>
            <h1>iPhone 12 Pro 64 GB</h1>
            <button className={styles.favoriteBtn}><FavoriteIcon /></button>
          </div>

          <div className={styles.price}>
            9 000 000 UZS
            <span className={styles.negotiable}>Торг есть</span>
          </div>

          <div className={styles.location}><LocationIcon /> Юнусабадский район, Ташкент</div>

          <div className={styles.actions}>
            <button className={styles.edit}><EditIcon /> Изменить</button>
            <button className={styles.promote}><TopIcon /> Поднять</button>
          </div>

          <ul className={styles.specs}>
            <li>
              <span className={styles.label}>Состояние</span>
              <span className={`${styles.value} ${styles.valueOne}`}>Новый</span>
            </li>
            <li>
              <span className={styles.label}>Память</span>
              <span className={styles.value}>64 GB</span>
            </li>
            <li>
              <span className={styles.label}>Год выпуска</span>
              <span className={styles.value}>2021</span>
            </li>
            <li>
              <span className={styles.label}>Цвет</span>
              <span className={styles.value}>
                <span className={styles.blueDot}></span> Синий
              </span>
            </li>
            <li>
              <span className={styles.label}>Коробка с документами</span>
              <span className={styles.value}>Есть</span>
            </li>
            <li>
              <span className={styles.label}>Размещено</span>
              <span className={styles.value}>17 мая 2022</span>
            </li>
            <li>
              <span className={styles.label}>Просмотров</span>
              <span className={styles.value}>250</span>
            </li>
            <li></li>
          </ul>
        </div>
      </div>

      <div className={styles.tabs}>
        <span
          className={activeTab === "description" ? styles.activeTab : ""}
          onClick={() => setActiveTab("description")}
        >
          Описание
        </span>
        <span className={activeTab === "reviews" ? styles.activeTab : ""} onClick={() => setActiveTab("reviews")}>
          Отзывы (4)
        </span>
      </div>

      <div className={styles.description}>
        {activeTab === "description" && (
          <p>
            Apple iPhone 12 Pro работает на базе самого быстрого процессора на сегодняшний день с применением
            5-нанометровой технологии, который обеспечивает ему невероятную плавность работы. Такой процессор также
            легко справляется с многозадачностью и позволяет запускать ресурсоёмкие игры и смотреть видео в <br /> высоком
            разрешении.
          </p>
        )}
        {activeTab === "reviews" && <p>Отзывы пользователей будут отображаться здесь.</p>}
      </div>
    </div>
  )
}

export default ProductDetails
