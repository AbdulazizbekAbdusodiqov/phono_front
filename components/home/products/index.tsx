// components/home/products/index.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "./product.module.scss";
import { useProducts } from "../../../hooks/products.use";
import ProductSkeleton from "../product-card/product-card.skelton";
import ProductCard from "../product-card";

const ProductSide = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const pageFromUrl = Number(router.query.page) || 1;
    const searchFromUrl = router.query.search as string;
    setPage(pageFromUrl);
    setSearch(searchFromUrl);
  }, [router.query.page, router.query.search]);
  const { data: products, isLoading } = useProducts(page, search);

  const handlePageChange = (newPage: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: newPage },
      },
      undefined,
      { shallow: true }
    );
  };

  if (isLoading) {
    return (
      <div className={style.products_grid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products?.data?.length === 0) {
    return (
      <div className={style.no_data}>
        <p>Нет данных</p>
      </div>
    );
  }

  return (
    <>
      <div className={style.products_grid}>
        {products?.data?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {products?.meta?.lastPage > 1 && (
        <div className={style.pagination}>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>

          {Array.from({ length: products.meta.lastPage }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={page === i + 1 ? style.active : ""}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === products.meta.lastPage}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ProductSide;
