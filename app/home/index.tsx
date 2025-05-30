import React from "react";
import style from "./home.module.scss";
import { FilterIcon, SearchIconInput } from "../../public/icons/profile";
import CategorySide from "../../components/home/category";
import ProductSide from "../../components/home/products";

const HomePage = () => {
  return (
    <div className={style.container}>
      <div className={style.home_input_wrapper}>
        <div className={style.input_search}>
          <input type="text" placeholder="Search..." />
          <SearchIconInput />
        </div>
        <div className={style.action_icon}>
          <div className={style.filter}>
            <FilterIcon />
          </div>
          <div className={style.search}>Search</div>
        </div>
      </div>
      <div className={style.category_wrapper}>
        <h1 className={style.category_title}>Категории</h1>
        <CategorySide />
      </div>
      <div className={style.prodcuts_wrapper}>
        <h1 className={style.products_title}>Объявления</h1>
        <ProductSide />
      </div>
    </div>
  );
};

export default HomePage;
