import type React from "react"
import Link from "next/link"
import styles from "./Card.module.scss"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { Product } from "../../types"

interface CardProps {
  product: Product
}

const Card: React.FC<CardProps> = ({ product}) => {
  const { id, product_image, title, condition, storage, price, negotiable } = product

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault() 
    e.stopPropagation()
  }
  
  return (
    <Link href={`/Profile/Edit`} className={styles.card}>
      <img src={process.env.NEXT_PUBLIC_BASE_URL +"/" + product_image[0].url || "/placeholder.svg"} alt={title} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.title}>
          <h3>{title}</h3>
          <div className={styles.like} onClick={handleFavoriteClick}>
            <FaHeart color="#FF4E64" /> 
          </div>
        </div>
        <p className={styles.wrapper}>
          <b>Состояние:</b> <span className={styles.condition}>{condition}</span>
        </p>
        <p className={styles.wrapper}>
          <b>Память:</b> <span className={styles.memory}>{storage}</span>
        </p>
        <div className={styles.footer}>
          <span className={styles.price}>{price}</span>
          {negotiable && <span className={styles.badge}>Торг есть</span>}
        </div>
      </div>
    </Link>
  )
}

export default Card
