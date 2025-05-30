import React from "react";
import style from "./category.module.scss";
import CategoryCard from "../category-card";
import { useCategory } from "../../../hooks/category";
import CategoryCardSkeleton from "../category-card/category-card.skelton";

const CategorySide = () => {
  const { data: categories, isLoading } = useCategory();

  if (isLoading) {
    return (
      <div className={style.category_card_wrapper}>
        {Array.from({ length: 10 }).map((_, idx) => (
          <CategoryCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className={style.empty_message}>
        <p>Категории не найдены</p>
      </div>
    );
  }

  return (
    <div className={style.category_card_wrapper}>
      {categories.map((category: any) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategorySide;
