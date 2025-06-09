import React, { useEffect, useRef, useState } from "react";
import style from "./CreateProduct.module.scss";
import { MdOutlineCameraAlt } from "react-icons/md";
import MapComponent from "./components/MapComponent";
import SuccessCreateModel from "./components/SuccessCreateModel";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/navigation";
import { CreateProductProps } from "@/types";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import {
  useCategory,
  useCategoryById,
  useColors,
  useCurrency,
} from "../../hooks/category";
import {
  useGetRegionById,
  useGetRegions,
  useUserPhoneNumbers,
} from "../../hooks/user";
import { AddressData } from "../../types/userData";
import { createProduct } from "../../endpoints/product";

enum SelectType {
  default = "default",
  manual = "manual",
}

interface Color {
  id: number | string;
  name: string;
  code?: string;
}

interface Model {
  id: number | string;
  name: string;
  brand_id: number | string;
}

interface Brand {
  id: number | string;
  name: string;
  model: Model[];
}

interface Currency {
  id: number | string;
  name: string;
}

interface Region {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
}

const CreateProduct = () => {
  const router = useRouter();
  const [selectType, setSelectType] = useState<SelectType>(SelectType.default);
  const [selectTypeLocation, setSelectTypeLocation] = useState<SelectType>(
    SelectType.default,
  );

  const [createModal, setCreateModal] = useState<boolean>(false);
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const [productData, setProductData] = useState<CreateProductProps>({
    title: "",
    brand_id: 0,
    model_id: 0,
    year: "",
    price: 0,
    currency_id: 1,
    description: "",
    negotiable: false,
    phone_number: "",
    user_id: Number(user?.id) || 0,
    address_id: 0,
    color_id: 0,
    has_document: false,
    ram: 0,
    storage: 0,
    other_model: "",
    condition: false,
  });

  const [addressData, setAddressData] = useState<AddressData>({
    user_id: Number(user?.id) || 0,
    region_id: null,
    district_id: null,
    name: "",
    lat: null,
    long: null,
    address: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API hooks
  const { data: brands } = useCategory();
  const { data: oneBrand } = useCategoryById(productData.brand_id);
  const { data: colors } = useColors();
  const { data: currency } = useCurrency();
  const { data: phoneNumbers } = useUserPhoneNumbers(Number(user?.id));
  const { data: regions } = useGetRegions();
  const { data: oneRegion } = useGetRegionById(addressData.region_id || 0);

  const handleClickPublishing = async () => {
    try {
      if (selectType === SelectType.manual) {
        productData.model_id = 0;
      } else if (selectType === SelectType.default) {
        productData.other_model = "";
      }
      const response = await createProduct({
        data: productData,
        images: images,
        addressData: addressData,
      });
      console.log("response: ", response);
      if (response) {
        toast.success("Product created successfully");
        setCreateModal(true);
        router.push(`/Profile`);
      }
    } catch (error: any) {
      console.log("Errorjon: ", error);
      toast.error(error.response?.data?.message || "Failed to create product");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray].slice(0, 10)); // Limit to 10 images
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Authentication check
  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000; // seconds

          if (
            typeof decoded === "object" &&
            decoded &&
            "exp" in decoded &&
            typeof (decoded as any).exp === "number" &&
            (decoded as any).exp < currentTime
          ) {
            toast.info(
              "Tizim sizni xavfsizlik uchun chiqarib qo'ydi. Iltimos, qayta kiring.",
            );
            router.push("/login");
          }
        } catch (error) {
          toast.info(
            "Tizim sizni xavfsizlik uchun chiqarib qo'ydi. Iltimos, qayta kiring.",
          );
          router.push("/login");
        }
      } else {
        toast.info(
          "Tizim sizni xavfsizlik uchun chiqarib qo'ydi. Iltimos, qayta kiring.",
        );
        router.push("/login");
      }
    } else {
      toast.info(
        "Tizim sizni xavfsizlik uchun chiqarib qo'ydi. Iltimos, qayta kiring.",
      );
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Update title when brand or model changes
  useEffect(() => {
    if (
      productData.brand_id &&
      selectType === SelectType.default &&
      productData.model_id
    ) {
      const brandName =
        brands?.find((brand: Brand) => brand.id == productData.brand_id)
          ?.name || "";
      const modelName =
        oneBrand?.model?.find(
          (model: Model) => model.id == productData.model_id,
        )?.name || "";
      setProductData((prev) => ({
        ...prev,
        title: `${brandName} ${modelName}`.trim(),
      }));
    } else if (
      productData.brand_id &&
      selectType === SelectType.manual &&
      productData.other_model
    ) {
      const brandName =
        brands?.find((brand: Brand) => brand.id == productData.brand_id)
          ?.name || "";
      setProductData((prev) => ({
        ...prev,
        title: `${brandName} ${productData.other_model}`.trim(),
      }));
    }
  }, [
    productData.brand_id,
    productData.model_id,
    productData.other_model,
    selectType,
    brands,
    oneBrand,
  ]);

  return (
    <div className={style.create_product_wrapper}>
      <div className={style.container}>
        <p>Создать объявление</p>

        <form className={style.form}>
          {/* Brand Selection */}
          <div>
            <p>Выберите бренд телефона</p>
            <div>
              <div className={style.select_buttons_wrapper}>
                <button
                  type="button"
                  className={
                    style.select_button +
                    " " +
                    (selectType === SelectType.default ? style.active : "")
                  }
                  onClick={() => setSelectType(SelectType.default)}
                >
                  Выбрать
                </button>
                <button
                  type="button"
                  className={
                    style.select_button +
                    " " +
                    (selectType === SelectType.manual ? style.active : "")
                  }
                  onClick={() => setSelectType(SelectType.manual)}
                >
                  Ввести вручную
                </button>
              </div>

              <div>
                <div>
                  <p className={style.select_label}>Выберите бренд</p>
                  <select
                    className={style.select}
                    value={productData.brand_id || ""}
                    onChange={(e) => {
                      setProductData({
                        ...productData,
                        brand_id: +e.target.value,
                        model_id: 0,
                        other_model: "",
                      });
                    }}
                  >
                    <option disabled value="">
                      Выберите бренд телефона
                    </option>
                    {brands?.map((brand: Brand) => (
                      <option key={brand.id} value={brand.id.toString()}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectType === SelectType.default ? (
                  <div>
                    <p className={style.select_label}>Выберите модель</p>
                    <select
                      className={style.select}
                      value={productData.model_id || ""}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          model_id: +e.target.value,
                          other_model: "",
                        })
                      }
                      disabled={!productData.brand_id}
                    >
                      <option disabled value="">
                        Выберите модель телефона
                      </option>
                      {oneBrand?.model?.map((model: Model) => (
                        <option key={model.id} value={model.id.toString()}>
                          {model.name}
                        </option>
                      )) || []}
                    </select>
                  </div>
                ) : (
                  <div>
                    <p className={style.select_label}>Выберите модель</p>
                    <input
                      className={style.input}
                      type="text"
                      placeholder="Выберите модель телефона"
                      value={productData.other_model || ""}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          other_model: e.target.value,
                          model_id: 0,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Year of Release */}
          <div className={style.form_section}>
            <p className={style.section_title}>Год выпуска</p>
            <div className={style.form_content}>
              <input
                className={style.input}
                type="number"
                min="2000"
                max={new Date().getFullYear()}
                placeholder="Например: 2023"
                value={productData.year}
                onChange={(e) =>
                  setProductData({ ...productData, year: e.target.value })
                }
              />
            </div>
          </div>

          {/* Specifications */}
          <div>
            <p>Выберите характеристики</p>
            <div className={style.selects_wrapper}>
              <div>
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                  Выберите память
                </p>
                <select
                  className={style.select}
                  value={productData.storage || ""}
                  onChange={(e) =>
                    setProductData({ ...productData, storage: +e.target.value })
                  }
                >
                  <option value="">Выберите память</option>
                  <option value="32">32 ГБ</option>
                  <option value="64">64 ГБ</option>
                  <option value="128">128 ГБ</option>
                  <option value="256">256 ГБ</option>
                  <option value="512">512 ГБ</option>
                  <option value="1024">1 ТБ</option>
                </select>
              </div>
              <div>
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                  Выберите оперативную память
                </p>
                <select
                  className={style.select}
                  value={productData.ram || ""}
                  onChange={(e) =>
                    setProductData({ ...productData, ram: +e.target.value })
                  }
                >
                  <option value="">Выберите оперативную память</option>
                  <option value="2">2 ГБ</option>
                  <option value="4">4 ГБ</option>
                  <option value="6">6 ГБ</option>
                  <option value="8">8 ГБ</option>
                  <option value="12">12 ГБ</option>
                  <option value="16">16 ГБ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <p>Добавьте фото</p>
            <div className={style.image_upload_section}>
              <div className={style.photo_upload_container}>
                {images.length < 10 && (
                  <div
                    className={`${style.upload_placeholder} ${style.photo_upload_box}`}
                    onClick={triggerFileInput}
                  >
                    <MdOutlineCameraAlt size={24} />
                    <span>Добавить фото</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />
                  </div>
                )}
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`${style.image_preview} ${style.photo_box}`}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                    />
                    <button
                      type="button"
                      className={style.remove_image_btn}
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={style.form__description}>
            <p>Описание</p>
            <textarea
              className={`${style.input} ${style.textarea}`}
              placeholder="Напишите что-нибудь..."
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
              maxLength={1000}
            />
            <p className={style.text_area_max_characters}>
              Максимум 1000 символов
            </p>
          </div>

          {/* Location */}
          <div className={style.form__location}>
            <p>Адрес продажи</p>
            <div className={style.select_buttons_wrapper}>
              <button
                type="button"
                className={
                  style.select_button +
                  " " +
                  (selectTypeLocation === SelectType.default
                    ? style.active
                    : "")
                }
                onClick={() => setSelectTypeLocation(SelectType.default)}
              >
                Выбрать
              </button>
              <button
                type="button"
                className={
                  style.select_button +
                  " " +
                  (selectTypeLocation === SelectType.manual ? style.active : "")
                }
                onClick={() => setSelectTypeLocation(SelectType.manual)}
              >
                Ввести вручную
              </button>
            </div>

            {selectTypeLocation === SelectType.default ? (
              <div>
                <div>
                  <p className={style.select_label}>Выбрать регион</p>
                  <select
                    className={style.select}
                    value={addressData.region_id || ""}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        region_id: +e.target.value,
                        district_id: null, // Reset district when region changes
                      })
                    }
                  >
                    <option disabled value="">
                      Выберите регион
                    </option>
                    {regions?.map((region: Region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className={style.select_label}>Выбрать город или район</p>
                  <select
                    className={style.select}
                    value={addressData.district_id || ""}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        district_id: +e.target.value,
                      })
                    }
                    disabled={!addressData.region_id}
                  >
                    <option disabled value="">
                      Выберите город или район
                    </option>
                    {oneRegion?.district?.map((district: District) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <MapComponent
                  addressData={addressData}
                  setAddressData={setAddressData}
                />
              </div>
            )}
          </div>

          {/* Price */}
          <div>
            <p>Цена</p>
            <div className={style.form__price}>
              <input
                type="number"
                className={style.input}
                placeholder="Сумма"
                value={productData.price || ""}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    price: Number(e.target.value),
                  })
                }
              />
              <select
                style={{ width: "100px" }}
                className={style.select}
                value={productData.currency_id || "1"}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    currency_id: +e.target.value,
                  })
                }
              >
                {currency?.map((item: Currency) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Negotiable */}
            <div>
              <p>Цена окончательная?</p>
              <div className={style.negotiable_wrapper}>
                <div className={style.radio_wrapper}>
                  <input
                    name="negotiable"
                    type="radio"
                    checked={productData.negotiable === true}
                    onChange={() =>
                      setProductData({ ...productData, negotiable: true })
                    }
                  />
                  <p>Торг есть</p>
                </div>
                <div className={style.radio_wrapper}>
                  <input
                    name="negotiable"
                    type="radio"
                    checked={productData.negotiable === false}
                    onChange={() =>
                      setProductData({ ...productData, negotiable: false })
                    }
                  />
                  <p>Да, окончательная</p>
                </div>
              </div>
            </div>

            {/* Condition */}
            <div>
              <p>Состояние</p>
              <div className={style.negotiable_wrapper}>
                <div className={style.radio_wrapper}>
                  <input
                    name="condition"
                    type="radio"
                    checked={productData.condition === true}
                    onChange={() =>
                      setProductData({ ...productData, condition: true })
                    }
                  />
                  <p>Новый</p>
                </div>
                <div className={style.radio_wrapper}>
                  <input
                    name="condition"
                    type="radio"
                    checked={productData.condition === false}
                    onChange={() =>
                      setProductData({ ...productData, condition: false })
                    }
                  />
                  <p>Б/У</p>
                </div>
              </div>
            </div>

            {/* Documentation */}
            <div>
              <p>Коробка с документами</p>
              <div className={style.negotiable_wrapper}>
                <div className={style.radio_wrapper}>
                  <input
                    name="has_document"
                    type="radio"
                    checked={productData.has_document === true}
                    onChange={() =>
                      setProductData({ ...productData, has_document: true })
                    }
                  />
                  <p>Есть</p>
                </div>
                <div className={style.radio_wrapper}>
                  <input
                    name="has_document"
                    type="radio"
                    checked={productData.has_document === false}
                    onChange={() =>
                      setProductData({ ...productData, has_document: false })
                    }
                  />
                  <p>Нет</p>
                </div>
              </div>
            </div>
          </div>

          {/* Color Selection */}
          <div className={style.form__color}>
            <p>Цвет телефона</p>
            <div className={style.color_wrapper}>
              {colors?.map((item: Color) => (
                <div
                  key={item.id}
                  onClick={() =>
                    setProductData({
                      ...productData,
                      color_id: +item.id,
                    })
                  }
                >
                  <div
                    className={`${style.color_box} ${
                      productData.color_id === +item.id
                        ? style.selected_color
                        : ""
                    }`}
                    style={{
                      backgroundColor: item.code || item.name,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <p>Номер телефона</p>
            <div className={style.phone_wrapper}>
              {phoneNumbers?.map((item: any) => (
                <div key={item.phone_number} className={style.radio_wrapper}>
                  <input
                    name="phone"
                    value={item.phone_number}
                    type="radio"
                    checked={productData.phone_number === item.phone_number}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        phone_number: e.target.value,
                      })
                    }
                  />
                  <p>{item.phone_number}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className={style.form__submit_buttons}>
            <a href="">Предпросмотр</a>
            <button type="button" onClick={handleClickPublishing}>
              Опубликовать
            </button>
          </div>
        </form>

        <SuccessCreateModel isOpen={createModal} setIsOpen={setCreateModal} />
      </div>
    </div>
  );
};

export default CreateProduct;
