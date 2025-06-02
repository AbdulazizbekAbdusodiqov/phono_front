import { useState } from "react"
import styles from "./Profile.module.scss"
import Card from "../../components/Card"
import { HeartIcon, PenIcon, SearchIcon } from "@/public/icons/profile"
import Breadcrumb from "@/components/Breadcrumb"
import EditProfileModal from "@/components/EditProfileModal/index"
import { Settings } from "../../app"

const products = [
  {
    id: 1,
    title: "Xiaomi Redmi Note 12",
    condition: "Новый",
    memory: "64 GB",
    price: "1 680 000 UZS",
    image: "/img/profile/Rectangle.png",
    isFavorite: false,
    isBargain: false,
  },
  {
    id: 2,
    title: "Samsung Galaxy S22 Ultra",
    condition: "Новый",
    memory: "64 GB",
    price: "1 680 000 UZS",
    image: "/img/profile/Rectangle-2.png",
    isFavorite: false,
    isBargain: true,
  },
  {
    id: 3,
    title: "Samsung Galaxy S22 Ultra",
    condition: "Новый",
    memory: "64 GB",
    price: "1 680 000 UZS",
    image: "/img/profile/Rectangle-3.png",
    isFavorite: false,
    isBargain: false,
  },
  {
    id: 4,
    title: "Apple iPhone SE",
    condition: "Новый",
    memory: "64 GB",
    price: "1 680 000 UZS",
    image: "/img/profile/Rectangle-4.png",
    isFavorite: false,
    isBargain: false,
  },
  {
    id: 5,
    title: "Samsung Galaxy S22 Ultra",
    condition: "Новый",
    memory: "64 GB",
    price: "1 680 000 UZS",
    image: "/img/profile/Rectangle-2.png",
    isFavorite: false,
    isBargain: false,
  },
  {
    id: 6,
    title: "Xiaomi Redmi Note 12",
    condition: "Новый",
    memory: "64 GB",
    price: "1 680 000 UZS",
    image: "/img/profile/Rectangle.png",
    isFavorite: false,
    isBargain: false,
  },
  {
    id: 7,
    title: "Apple iPhone SE",
    condition: "Новый",
    memory: "64 GB",
    price: "1 680 000 UZS",
    image: "/img/profile/Rectangle-4.png",
    isFavorite: false,
    isBargain: true,
  },
  {
    id: 8,
    title: "Samsung Galaxy S22 Ultra",
    condition: "Новый",
    memory: "64 GB",
    price: "1 680 000 UZS",
    image: "/img/profile/Rectangle-3.png",
    isFavorite: false,
    isBargain: false,
  },
]

type TabType = "Объявления" | "Сообщения" | "Избранное" | "Контактные данные" | "Настройки"

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("Объявления")
  const [userProfile, setUserProfile] = useState({
    username: "Rochel_123",
    balance: "100 000 сум",
    avatar: "/img/profile/Avatar.png",
    name: "Rachel",
    familyName: "_123",
    birthday: "1999-03-16",
  })

  const [productsList, setProductsList] = useState(products)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSaveProfile = (data: {
    name: string
    familyName: string
    birthday: string
    avatar: string
  }) => {
    setUserProfile((prev) => ({
      ...prev,
      name: data.name,
      familyName: data.familyName,
      birthday: data.birthday,
      avatar: data.avatar,
      username: `${data.name}${data.familyName}`,
    }))
  }

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab)
  }

  const toggleFavorite = (productId: number) => {
    setProductsList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, isFavorite: !product.isFavorite } : product,
      ),
    )
  }

  const filteredProducts =
    activeTab === "Избранное" ? productsList.filter((product) => product.isFavorite) : productsList

  return (
    <div className={`${styles.profile} ${styles.container}`}>
      <Breadcrumb />
      <h1 className={styles.title}>Профиль</h1>
      <div className={styles.hrLine} />

      <div className={styles.userInfo}>
        <img
          src={userProfile.avatar || '/placeholder.svg'}
          alt="Avatar"
          className={styles.avatar}
        />
        <div>
          <h2>{userProfile.username}</h2>
          <p>
            Баланс:{' '}
            <span className={styles.balance}>{userProfile.balance}</span>
          </p>
        </div>
        <button className={styles.editButton} onClick={openModal}>
          <div className={styles.edit}>
            <PenIcon /> Редактировать
          </div>
        </button>
      </div>

      <div className={styles.tabs}>
        <span
          className={activeTab === 'Объявления' ? styles.active : ''}
          onClick={() => handleTabClick('Объявления')}
        >
          Объявления
        </span>
        <span
          className={activeTab === 'Сообщения' ? styles.active : ''}
          onClick={() => handleTabClick('Сообщения')}
        >
          Сообщения
        </span>
        <span
          className={activeTab === 'Избранное' ? styles.active : ''}
          onClick={() => handleTabClick('Избранное')}
        >
          Избранное
        </span>
        <span
          className={activeTab === 'Контактные данные' ? styles.active : ''}
          onClick={() => handleTabClick('Контактные данные')}
        >
          Контактные данные
        </span>
        <span
          className={activeTab === 'Настройки' ? styles.active : ''}
          onClick={() => handleTabClick('Настройки')}
        >
          Настройки
        </span>
      </div>

      <div className={styles.hrLine} />

      <div className={styles.search}>
        <div className={styles.searchInput}>
          <SearchIcon />
          <input type="text" placeholder="Type e.g Slots games" />
        </div>
        <button className={styles.searchButton}>Поиск</button>
      </div>

      {activeTab === 'Избранное' && filteredProducts.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <HeartIcon />
          </div>
          <h3>Нет избранных товаров</h3>
          <p>Добавьте товары в избранное, нажав на сердечко</p>
        </div>
      ) : activeTab === 'Настройки' ? (
        <Settings/>
      ) : (
        <div className={styles.cardGrid}>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
              onFavoriteToggle={() => toggleFavorite(product.id)}
            />
          ))}
        </div>
      )}

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialData={{
          name: userProfile.name,
          familyName: userProfile.familyName,
          birthday: userProfile.birthday,
          avatar: userProfile.avatar,
        }}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

export default Profile