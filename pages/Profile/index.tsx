import React from 'react';
import styles from './Profile.module.scss';
import Card from "../../components/Card";

import { PenIcon, SearchIcon } from '@/public/icons/profile';
import Breadcrumb from '@/components/Breadcrumb';

const products = [
  {
    id: 1,
    title: 'Xiaomi Redmi Note 12',
    condition: 'Новый',
    memory: '64 GB',
    price: '1 680 000 UZS',
    image: '/img/profile/Rectangle.png',
    isFavorite: true,
    isBargain: false,
  },
  {
    id: 2,
    title: 'Samsung Galaxy S22 Ultra',
    condition: 'Новый',
    memory: '64 GB',
    price: '1 680 000 UZS',
    image: '/img/profile/Rectangle-2.png',
    isFavorite: false,
    isBargain: true,
  },
  {
    id: 3,
    title: 'Samsung Galaxy S22 Ultra',
    condition: 'Новый',
    memory: '64 GB',
    price: '1 680 000 UZS',
    image: '/img/profile/Rectangle-3.png',
    isFavorite: false,
    isBargain: false,
  },
  {
    id: 4,
    title: 'Apple iPhone SE',
    condition: 'Новый',
    memory: '64 GB',
    price: '1 680 000 UZS',
    image: '/img/profile/Rectangle-4.png',
    isFavorite: false,
    isBargain: false,
  },
  {
    id: 5,
    title: 'Samsung Galaxy S22 Ultra',
    condition: 'Новый',
    memory: '64 GB',
    price: '1 680 000 UZS',
    image: '/img/profile/Rectangle-2.png',
    isFavorite: false,
    isBargain: false,
  },
  {
    id: 6,
    title: 'Xiaomi Redmi Note 12',
    condition: 'Новый',
    memory: '64 GB',
    price: '1 680 000 UZS',
    image: '/img/profile/Rectangle.png',
    isFavorite: true,
    isBargain: false,
  },
  {
    id: 7,
    title: 'Apple iPhone SE',
    condition: 'Новый',
    memory: '64 GB',
    price: '1 680 000 UZS',
    image: '/img/profile/Rectangle-4.png',
    isFavorite: false,
    isBargain: true,
  },
  {
    id: 8,
    title: 'Samsung Galaxy S22 Ultra',
    condition: 'Новый',
    memory: '64 GB',
    price: '1 680 000 UZS',
    image: '/img/profile/Rectangle-3.png',
    isFavorite: false,
    isBargain: false,
  },
];

const Profile = () => {
  return (
    <div className={`${styles.profile} ${styles.container}`}>
      <Breadcrumb />
      <h1 className={styles.title}>Профиль</h1>

      <div className={styles.hrLine}></div>

      <div className={styles.userInfo}>
        <img src="../../img/profile/Avatar.png" alt="Avatar" className={styles.avatar} />
        <div>
          <h2>Rochel_123</h2>
          <p>Баланс: <span className={styles.balance}>100 000 сум</span></p>
        </div>
        <button className={styles.disabledButton} disabled><div className={styles.edit} ><PenIcon /> Редактировать</div></button>
      </div>

      <div className={styles.tabs}>
        <span className={styles.active}>Объявления</span>
        <span>Сообщения</span>
        <span>Избранное</span>
        <span>Контактные данные</span>
        <span>Настройки</span>
      </div>
      <div className={styles.hrLine}></div>
      <div className={styles.search}>
        <div className={styles.searchInput}>
          <SearchIcon />
          <input type="text" placeholder="Type e.g Slots games" />
        </div>
        <button className={styles.searchButton}>Поиск</button>
      </div>

      <div className={styles.cardGrid}>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
