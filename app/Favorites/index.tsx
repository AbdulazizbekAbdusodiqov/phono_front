import React from "react";
import styles from "./Favorites.module.scss";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import { useFavorites } from "@/hooks/useFavorites";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useGetMe } from "@/hooks/auth";
import { Product } from "../../types";
import { HeartIcon } from "@/public/icons/profile";

const Favorites = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: me } = useGetMe(Number(user?.id));
  const { favorites, toggleFavorite } = useFavorites();

  const productsList = me?.product ?? [];
  const favoriteProducts = productsList.filter((product: Product) =>
    favorites.includes(product.id)
  );

  if (!me) {
    return (
      <div className={`${styles.favorites} ${styles.container}`}>
        <Breadcrumb />
        <h1 className={styles.title}>Избранное</h1>
        <div className={styles.hrLine} />
        <div className={styles.emptyState}>
          <h3>Загрузка данных...</h3>
        </div>
      </div>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className={`${styles.favorites} ${styles.container}`}>
        <Breadcrumb />
        <h1 className={styles.title}>Избранное</h1>
        <div className={styles.hrLine} />
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <HeartIcon />
          </div>
          <h3>Нет избранных товаров</h3>
          <p>Добавьте товары в избранное, нажав на сердечко</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.favorites} ${styles.container}`}>
      <Breadcrumb />
      <h1 className={styles.title}>Избранное</h1>
      <div className={styles.hrLine} />
      <div className={styles.cardGrid}>
        {favoriteProducts.map((product: Product) => (
          <Card
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
