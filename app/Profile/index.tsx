import { useState } from "react"
import styles from "./Profile.module.scss"
import Card from "../../components/Card"
import { HeartIcon, PenIcon, SearchIcon } from "@/public/icons/profile"
import Breadcrumb from "@/components/Breadcrumb"
import EditProfileModal from "@/components/EditProfileModal/index"
import type { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { useGetMe } from "@/hooks/auth"
import Settings from "../Settings"
import { Product } from "../../types"

type TabType = "Объявления" | "Сообщения" | "Избранное" | "Контактные данные" | "Настройки"

const Profile = ({children}: {children: React.ReactNode}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("Объявления")
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { data: me } = useGetMe(Number(user?.id))
  const productsList = me?.product

  const userProfile = {
    username: me ? `${me.first_name} ${me.last_name}` : "Имя пользователя",
    balance: me?.balance ? `${me.balance} сум` : "0 сум",
    avatar: me?.profile_img || "/img/profile/Avatar.svg",
    name: me?.first_name || "",
    familyName: me?.last_name || "",
    birthday: me?.birth_date || "1999-03-16",
  }


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
    console.log("Profile data to be saved:", data)
  }

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab)
  }



  return (
    <div className={`${styles.profile} ${styles.container}`}>
      <Breadcrumb />
      <h1 className={styles.title}>Профиль</h1>
      <div className={styles.hrLine} />

      <div className={styles.userInfo}>
        <img src={userProfile.avatar || "/placeholder.svg"} alt="Avatar" className={styles.avatar} />
        <div>
          <h2>{userProfile.username}</h2>
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
        <span className={activeTab === "Объявления" ? styles.active : ""} onClick={() => handleTabClick("Объявления")}>
          Объявления
        </span>
        <span className={activeTab === "Сообщения" ? styles.active : ""} onClick={() => handleTabClick("Сообщения")}>
          Сообщения
        </span>
        <span className={activeTab === "Избранное" ? styles.active : ""} onClick={() => handleTabClick("Избранное")}>
          Избранное
        </span>
        <span
          className={activeTab === "Контактные данные" ? styles.active : ""}
          onClick={() => handleTabClick("Контактные данные")}
        >
          Контактные данные
        </span>
        <span className={activeTab === "Настройки" ? styles.active : ""} onClick={() => handleTabClick("Настройки")}>
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

      {activeTab === "Избранное" && productsList.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <HeartIcon />
          </div>
          <h3>Нет избранных товаров</h3>
          <p>Добавьте товары в избранное, нажав на сердечко</p>
        </div>
      ) : activeTab === "Настройки" ? (
        <Settings />
      ) : (
        <div className={styles.cardGrid}>
          {productsList?.map((product: Product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
      {activeTab === "Сообщения" && (
          <div className={styles.chat}>
            {children}
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
  )
}

export default Profile
