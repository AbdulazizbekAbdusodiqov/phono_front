"use client";

import React from "react";
import Link from "next/link";
import styles from "./Card.module.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Product {
  id: number;
  image: string;
  title: string;
  condition: string;
  memory: string;
  price: string;
  isFavorite: boolean;
  isBargain: boolean;
}

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const { id, image, title, condition, memory, price, isFavorite, isBargain } =
    product;

  return (
    <Link href={`/Profile/Edit`} className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.title}>
          <h3>{title}</h3>
          <div className={styles.like}>
            {isFavorite ? <FaHeart color="#FF4E64" /> : <FaRegHeart />}
          </div>
        </div>
        <p className={styles.wrapper}>
          <b>Состояние:</b>{" "}
          <span className={styles.condition}>{condition}</span>
        </p>
        <p className={styles.wrapper}>
          <b>Память:</b> <span className={styles.memory}>{memory}</span>
        </p>
        <div className={styles.footer}>
          <span className={styles.price}>{price}</span>
          {isBargain && <span className={styles.badge}>Торг есть</span>}
        </div>
      </div>
    </Link>
  );
};

export default Card;
