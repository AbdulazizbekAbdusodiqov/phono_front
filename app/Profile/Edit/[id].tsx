import { useState } from "react"
import styles from "./Edit.module.scss"
import Image from "next/image"
import Breadcrumb from "@/components/Breadcrumb"
import EditProductModal from "@/components/EditProductModal/index"
import { EditIcon, FavoriteIcon, LeftNavIcon, LocationIcon, RightNavIcon, TopIcon } from "@/public/icons/profile"
import { useRouter } from "next/router"
import { useProductById } from "../../../hooks/products.use"

interface ProductData {
  id: number
  title: string
  price: string
  location: string
  condition: string
  memory: string
  year: string
  color: string
  hasDocuments: boolean
  publishDate: string
  views: number
  description: string
  isFavorite: boolean
  isNegotiable: boolean
  images: string[]
}

const Edit = () => {
  const router = useRouter()
  const { id } = router.query
  console.log(id);
  const {data: product} = useProductById(Number(id))
  const [activeTab, setActiveTab] = useState("description")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  console.log(product);
  
  const [productData, setProductData] = useState<ProductData>({
    id: Number(id),
    title: "iPhone 12 Pro 128 GB",
    price: "9 000 000 UZS",
    location: "Юнусабадский район, Ташкент",
    condition: "Новый",
    memory: "64 GB",
    year: "2021",
    color: "Синий",
    hasDocuments: true,
    publishDate: "17 мая 2022",
    views: 250,
    description:
      "Apple iPhone 12 Pro работает на базе самого быстрого процессора на сегодняшний день с применением 5-нанометровой технологии, который обеспечивает ему невероятную плавность работы. Такой процессор также легко справляется с многозадачностью и позволяет запускать ресурсоёмкие игры и смотреть видео в высоком разрешении.",
    isFavorite: false,
    isNegotiable: true,
    images: [
      "/img/edit/Rectangle-5.png",
      "/img/edit/Rectangle-6.png",
      "/img/edit/Rectangle-7.png",
      "/img/edit/Rectangle-8.png",
      "/img/edit/Rectangle-5.png",
    ],
  })

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? productData.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === productData.images.length - 1 ? 0 : prev + 1))
  }

  const handleImageSelect = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleFavoriteToggle = async () => {
    try {
      const response = await fetch(`/api/products/${productData.id}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setProductData((prev) => ({
          ...prev,
          isFavorite: !prev.isFavorite,
        }))
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    }
  }
  const handleEditClick = () => {
    setIsEditModalOpen(true)
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false)
  }

  const handleProductSave = async (updatedData: Partial<ProductData>) => {
    try {
      const response = await fetch(`/api/products/${productData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })

      if (response.ok) {
        const updated = await response.json()
        setProductData((prev) => ({ ...prev, ...updated }))
        setIsEditModalOpen(false)
      }
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const handlePromote = async () => {
    try {
      const response = await fetch(`/api/products/${productData.id}/promote`, {
        method: "POST",
      })

      if (response.ok) {
        alert("Объявление поднято!")
      }
    } catch (error) {
      console.error("Error promoting product:", error)
    }
  }

  return (
    <div className={styles.detailsPage}>
      <div className={styles.breadcrumbs}>
        <Breadcrumb />
      </div>

      <div className={styles.container}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <Image
              src={productData.images[currentImageIndex] || "/placeholder.svg"}
              alt={productData.title}
              width={500}
              height={500}
              className={styles.mainImg}
            />
            <div className={styles.imageControls}>
              <button className={styles.navButton} onClick={handlePrevImage}>
                <LeftNavIcon />
              </button>
              <button className={styles.navButton} onClick={handleNextImage}>
                <RightNavIcon />
              </button>
            </div>
            <div className={styles.indicators}>
              {productData.images.map((_, index) => (
                <span
                  key={index}
                  className={index === currentImageIndex ? styles.active : ""}
                  onClick={() => handleImageSelect(index)}
                />
              ))}
            </div>
          </div>
          <div className={styles.thumbnails}>
            {productData.images.slice(1, 4).map((image, index) => (
              <Image
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${productData.title} ${index + 1}`}
                width={100}
                height={100}
                className={styles.thumbnail}
                onClick={() => handleImageSelect(index + 1)}
              />
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.header}>
            <h1>{productData.title}</h1>
            <button
              className={`${styles.favoriteBtn} ${productData.isFavorite ? styles.favorited : ""}`}
              onClick={handleFavoriteToggle}
            >
              <FavoriteIcon />
            </button>
          </div>

          <div className={styles.price}>
            {productData.price}
            {productData.isNegotiable && <span className={styles.negotiable}>Торг есть</span>}
          </div>

          <div className={styles.location}>
            <LocationIcon /> {productData.location}
          </div>

          <div className={styles.actions}>
            <button className={styles.edit} onClick={handleEditClick}>
              <EditIcon /> Изменить
            </button>
            <button className={styles.promote} onClick={handlePromote}>
              <TopIcon /> Поднять
            </button>
          </div>

          <ul className={styles.specs}>
            <li>
              <span className={styles.label}>Состояние</span>
              <span className={`${styles.value} ${styles.valueOne}`}>{productData.condition}</span>
            </li>
            <li>
              <span className={styles.label}>Память</span>
              <span className={styles.value}>{productData.memory}</span>
            </li>
            <li>
              <span className={styles.label}>Год выпуска</span>
              <span className={styles.value}>{productData.year}</span>
            </li>
            <li>
              <span className={styles.label}>Цвет</span>
              <span className={styles.value}>
                <span className={styles.blueDot}></span> {productData.color}
              </span>
            </li>
            <li>
              <span className={styles.label}>Коробка с документами</span>
              <span className={styles.value}>{productData.hasDocuments ? "Есть" : "Нет"}</span>
            </li>
            <li>
              <span className={styles.label}>Размещено</span>
              <span className={styles.value}>{productData.publishDate}</span>
            </li>
            <li>
              <span className={styles.label}>Просмотров</span>
              <span className={styles.value}>{productData.views}</span>
            </li>
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
          Отзывы (0)
        </span>
      </div>

      <div className={styles.description}>
        {activeTab === "description" && <p>{productData.description}</p>}
        {activeTab === "reviews" && <p>Отзывы пользователей будут отображаться здесь.</p>}
      </div>

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        productData={productData}
        onSave={handleProductSave}
      />
    </div>
  )
}

export default Edit
