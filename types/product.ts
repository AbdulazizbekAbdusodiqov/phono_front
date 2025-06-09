import { Address } from "cluster";

export interface CreateProductProps {
  title: string;
  storage: number;
  ram: number;
  user_id: number;
  brand_id: number;
  model_id?: number | null;
  other_model?: string | null;
  color_id: number;
  price: number;
  currency_id: number;
  description: string;
  year: string;
  negotiable: boolean;
  has_document: boolean;
  phone_number: string;
  address_id: number;
  condition: boolean;
}

enum isChecked {
  PENDING,
  APPROVED,
  REJECTED,
}

interface ProductImage {
  id: number;
  product_id: number;
  url: string;
}

export interface Product {
  id: number;
  title: string;
  storage: number;
  ram: number;
  user_id?: number;
  brand_id: number;
  model_id?: number;
  other_model?: string;
  color_id: number;
  price: number;
  currency_id: number;
  description: string;
  year: string;
  negotiable: boolean;
  condition: boolean;
  has_document: boolean;
  phone_number: string;
  address_id?: number;
  slug: string;
  is_top: boolean;
  is_checked: isChecked;
  is_active: boolean;
  is_deleted: boolean;
  view_count: number;
  like_count: number;
  brand: {
    id: number;
    name: string;
  };
  model?: {
    id: number;
    name: string;
    brand_id: number;
  };
  color?: {
    id: number;
    name: string;
    code?: string;
  };
  currency: {
    id: number;
    name: string;
  };
  product_image: ProductImage[];
}
