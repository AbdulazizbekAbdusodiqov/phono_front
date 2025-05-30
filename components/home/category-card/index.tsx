import React from "react";
import style from "./category-card.module.scss";
import Image from "next/image";

const CategoryCard = (props: any) => {
  const { id, name, logo } = props.category;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <div className={style.card_wrapper}>
      <div className={style.img_wrapper}>
        <Image
          src={`${BASE_URL}/uploads/${logo}`}
          alt={name}
          width={80}
          height={80}
        />
      </div>
      <div className={style.card_title}>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
