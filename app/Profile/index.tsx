import { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import Card from "../../components/Card";
import { HeartIcon, PenIcon, SearchIcon } from "@/public/icons/profile";
import Breadcrumb from "@/components/Breadcrumb";
import EditProfileModal from "@/components/EditProfileModal/index";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useGetMe } from "@/hooks/auth";
import Settings from "../Settings";
import { Product } from "../../types";

type TabType =
  | "Объявления"
  | "Сообщения"
  | "Избранное"
  | "Контактные данные"
  | "Настройки";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("Объявления");

  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    }
    return [];
  });

  const { user } = useSelector((state: RootState) => state.auth);
  const { data: me } = useGetMe(Number(user?.id));

  const productsList = me?.product ?? [];

  const favoriteProducts = productsList.filter((product: Product) =>
    favorites.includes(product.id)
  );
  
  const userProfile = {
    first_name: me ? `${me.first_name} ${me.last_name}` : "",
    balance: me?.balance ? `${me.balance} сум` : "0 сум",
    profile_img: `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${me?.profile_img}` || "/img/profile/Avatar.svg",
    name: me?.first_name || "",
    last_name: me?.last_name || "",
    birth_date: me?.birth_date || "1999-03-16",
  };
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveProfile = (data: {
    first_name: string;
    last_name: string;
    birth_date: string;
    profile_img: string;
  }) => {
    console.log("");
    
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className={`${styles.profile} ${styles.container}`}>
      <Breadcrumb />
      <h1 className={styles.title}>Профиль</h1>
      <div className={styles.hrLine} />

      <div className={styles.userInfo}>
        <img
          src={userProfile.profile_img || "/placeholder.svg"}
          alt="Avatar"
          className={styles.avatar}
        />
        <div>
          <h2>{userProfile.first_name}</h2>
          <p>
            Баланс: <span className={styles.balance}>{userProfile.balance}</span>
          </p>
        </div>
        <button className={styles.editButton} onClick={openModal}>
          <div className={styles.edit}>
            <PenIcon /> Редактировать
          </div>
        </button>
      </div>

      <div className={styles.tabs}>
        {[
          "Объявления",
          "Сообщения",
          "Избранное",
          "Контактные данные",
          "Настройки",
        ].map((tab) => (
          <span
            key={tab}
            className={activeTab === tab ? styles.active : ""}
            onClick={() => setActiveTab(tab as TabType)}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className={styles.hrLine} />

      <div className={styles.search}>
        <div className={styles.searchInput}>
          <SearchIcon />
          <input type="text" placeholder="Type e.g Slots games" />
        </div>
        <button className={styles.searchButton}>Поиск</button>
      </div>

      {activeTab === "Избранное" ? (
        favoriteProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <HeartIcon />
            </div>
            <h3>Нет избранных товаров</h3>
            <p>Добавьте товары в избранное, нажав на сердечко</p>
          </div>
        ) : (
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
        )
      ) : activeTab === "Настройки" ? (
        <Settings />
      ) : (
        <div className={styles.cardGrid}>
          {productsList.map((product: Product) => (
            <Card
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userId={Number(user?.id)}
        initialData={{
          first_name: userProfile.first_name,
          last_name: userProfile.last_name,
          birth_date: userProfile.birth_date,
          profile_img: userProfile.profile_img,
        }}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Profile;
