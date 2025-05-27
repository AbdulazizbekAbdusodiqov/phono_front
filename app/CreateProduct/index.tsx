import React, { useState } from 'react'
import style from "./CreateProduct.module.scss"
const CreateProduct = () => {
  const [selectType, setSelectType] = useState("default")
  return (
    <div className={style.create_product_wrapper}>
      <div className={style.container}>
        <p >Создать объявление</p>
        <form action="" className={style.form}>
          <div>
            <p>Выберите бренд телефона</p>
            <div >
              <div className={style.select_buttons_wrapper}>
                <button type='button' className={style.select_button + " " + (selectType === "default" ? style.active : "")} onClick={() => setSelectType("default")}>Выбрать</button>
                <button type='button' className={style.select_button + " " + (selectType === "manual" ? style.active : "")} onClick={() => setSelectType("manual")}>Ввести вручную</button>
              </div>
              <div>
                <div>
                  <p className={style.select_label}>Выберите бренд</p>
                  <select className={style.select} name="" id="">
                    <option selected disabled value="">Выберите бренд телефона </option>
                    <option value="">Apple</option>
                    <option value="">Samsung</option>
                    <option value="">Xiaomi</option>
                    <option value="">Huawei</option>
                    <option value="">OnePlus</option>
                    <option value="">Realme</option>
                    <option value="">OPPO</option>
                    <option value="">Nokia</option>
                    <option value="">iPhone</option>
                  </select>
                </div>
                {
                  selectType === "default"
                    ?
                    <div>
                      <p className={style.select_label}>Выберите модель</p>
                      <select name="" id="" className={style.select}>
                        <option disabled value="">Выберите модель телефона </option>
                        <option value="">iPhone 14 Pro Max</option>
                        <option value="">iPhone 14 Pro</option>

                      </select>
                    </div>
                    :
                    <div>
                      <p className={style.select_label}>Выберите модель</p>
                      <input className={style.input} type="text" placeholder='Выберите модель телефона' />
                    </div>
                }
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct