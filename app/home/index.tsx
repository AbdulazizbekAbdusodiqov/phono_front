import { useState, useEffect } from "react";
import style from "./home.module.scss";
import CategorySide from "../../components/home/category";
import ProductSide from "../../components/home/products";
import SearchInput from "../../components/home/search-input";
import FilterSide from "../../components/home/filter";
import { useRouter } from "next/router";

interface FilterState {
  regionId: number | null;
  topAdsOnly: boolean;
  condition: string;
  brandId: number | null;
  manualBrand: string;
  memoryId: number | null;
  colorId: number | null;
}

const HomePage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);
  const router = useRouter();

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const closeFilter = () => setIsFilterOpen(false);

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    closeFilter();
  };

  const handleClearQuery = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { shallow: true }
    );
  };

  const showViewAll = !!router.query.brand;

  return (
    <div className={style.container}>
      <SearchInput onFilterClick={toggleFilter} />

      {isFilterOpen && (
        <>
          <div className={style.overlay} onClick={closeFilter}></div>
          <div className={style.filter_side_wrapper}>
            <FilterSide onClose={closeFilter} onApply={handleApplyFilters} />
          </div>
        </>
      )}

      <div className={style.category_wrapper}>
        <div className={style.category_header}>
          <h1 className={style.category_title}>Категории</h1>
          {showViewAll && (
            <button
              className={style.view_all_button}
              onClick={handleClearQuery}
            >
              View All
            </button>
          )}
        </div>
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
