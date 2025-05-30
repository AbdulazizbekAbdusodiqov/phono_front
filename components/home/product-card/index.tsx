import style from "./product.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

const ProductCard = ({ product }: { product?: any }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  if (!product) return null;

  const {
    id,
    title,
    price,
    currency,
    condition,
    storage,
    product_image,
    like_count,
    negotiable,
  } = product;

  return (
    <Link href={`/product-details/${id}`} className={style.product_link}>
      <div className={style.product_card_wrapper}>
        <div className={style.card_img}>
          {product_image && product_image.length > 0 ? (
            <Image
              src={`${BASE_URL}/${product_image[0]?.url}`}
              alt={title || "Product image"}
              width={400}
              height={300}
              className={style.product_image}
            />
          ) : (
            <div className={style.no_image}>No image available</div>
          )}
        </div>
        <div className={style.card_content}>
          <div className={style.title_row}>
            <h3 className={style.title}>{title}</h3>
            <button
              className={`${style.heart_btn} ${
                like_count > 0 ? style.active : ""
              }`}
              onClick={(e) => e.preventDefault()} // prevent link navigation
            >
              <Heart size={20} />
            </button>
          </div>

          <div className={style.specs_row}>
            <div className={style.spec_item}>
              <span className={style.spec_label}>Состояние:</span>
              <span className={style.spec_value_blue}>
                {condition ? "Новый" : "Б/у"}
              </span>
            </div>
            <div className={style.spec_item}>
              <span className={style.spec_label}>Память:</span>
              <span className={style.spec_value}>{storage} GB</span>
            </div>
          </div>

          <div className={style.price_row}>
            <span className={style.price}>
              {price} {currency?.name || "UZS"}
            </span>
            {negotiable && (
              <span className={style.negotiable_tag}>Торг есть</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
