import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import style from "./CreateProduct.module.scss"
import { CiCirclePlus } from 'react-icons/ci'
import { MdOutlineCameraAlt } from 'react-icons/md'
import MapComponent from './components/MapComponent'
import SuccessCreateModel from './components/SuccessCreateModel'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useRouter } from 'next/navigation'
enum SelectType {
  default = "default",
  manual = "manual"
}
const CreateProduct = () => {
  const router = useRouter()
  const [selectType, setSelectType] = useState<SelectType>(SelectType.default)
  const [selectTypeLocation, setSelectTypeLocation] = useState<SelectType>(SelectType.default)
  const [createModal, setCreateModal] = useState<boolean>(false)
  const {user, isAuthenticated} = useSelector((state:RootState)=>state.auth)
  useEffect(()=>{
    if(!isAuthenticated || !localStorage.getItem("accessToken")){
      router.push("/login")
    }
  },[])
  
  const handleClickPublishing = () => {
    console.log(user);
    setCreateModal(true)
  }
  return (
    <div className={style.create_product_wrapper}>
      <div className={style.container}>
        <p >Создать объявление</p>
        <form action="" className={style.form}>
          <div>
            <p>Выберите бренд телефона</p>
            <div >
              <div className={style.select_buttons_wrapper}>
                <button type='button' className={style.select_button + " " + (selectType === SelectType.default ? style.active : "")} onClick={() => setSelectType(SelectType.default)}>Выбрать</button>
                <button type='button' className={style.select_button + " " + (selectType === SelectType.manual ? style.active : "")} onClick={() => setSelectType(SelectType.manual)}>Ввести вручную</button>
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
                  selectType === SelectType.default
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
          {/* Year of Release */}
          <div className={style.form_section}>
            <p className={style.section_title}>Год выпуска</p>
            <div className={style.form_content}>
              <input
                className={style.input}
                type="number"
                min="2000"
                max={new Date().getFullYear()}
                placeholder='Например: 2023'
              />
            </div>
          </div>
          <div>
            <p>Добавьте фото</p>
            <div className={style.photo_upload_container}>
              <div className={style.photo_upload_box}>
                <CiCirclePlus />
                Добавить фото
              </div>
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div className={style.photo_box} key={item}>
                  <MdOutlineCameraAlt />
                </div>
              ))}
            </div>
          </div>
          <div className={style.form__description}>
            <p>Описание</p>
            <textarea
              className={`${style.input} ${style.textarea}`}
              placeholder='Напишите что-нибудь...'
            />
            <p className={style.text_area_max_characters}>Максимум 1000 символов</p>
          </div>
          <div className={style.form__location}>
            <p>Адрес продажи</p>
            <div className={style.select_buttons_wrapper}>
              <button type='button' className={style.select_button + " " + (selectTypeLocation === SelectType.default ? style.active : "")} onClick={() => setSelectTypeLocation(SelectType.default)}>Выбрать</button>
              <button type='button' className={style.select_button + " " + (selectTypeLocation === SelectType.manual ? style.active : "")} onClick={() => setSelectTypeLocation(SelectType.manual)}>Ввести вручную</button>
            </div>
            {
              selectTypeLocation === SelectType.default
                ?
                <div>
                  <div>
                    <p className={style.select_label}>Выбрать регион</p>
                    <select className={style.select} name="" id="">
                      <option selected disabled value="">Выберите регион</option>
                      <option value="">Toshkent</option>
                    </select>
                  </div>
                  <div>
                    <p className={style.select_label}>Выбрать город или район</p>
                    <select className={style.select} name="" id="">
                      <option selected disabled value="">Выберите город или район</option>
                      <option value="">Chilonzor</option>
                    </select>
                  </div>
                </div>
                :
                <div>
                  <MapComponent />
                </div>
            }
          </div>
          <div>
            <p>Цена</p>
            <div className={style.form__price}>
              <input type="number" className={style.input} placeholder='Сумма' />
              <select style={{ width: "100px" }} className={style.select} name="" id="">
                <option value="">UZS</option>
                <option value="">USD</option>
                <option value="">RUB</option>
              </select>
            </div>
            <div>
              <p>Цена окончательная?</p>
              <div className={style.negotiable_wrapper}>
                <div className={style.radio_wrapper}>
                  <input name='negotiable' type="radio" />
                  <p>Торг есть</p>
                </div>
                <div className={style.radio_wrapper}>
                  <input name='negotiable' type="radio" />
                  <p>Да, окончательная</p>
                </div>
              </div>
            </div>
            <div>
              <p>Состояние</p>
              <div className={style.negotiable_wrapper}>
                <div className={style.radio_wrapper}>
                  <input name='condition' type="radio" />
                  <p>Новый</p>
                </div>
                <div className={style.radio_wrapper}>
                  <input name='condition' type="radio" />
                  <p>Б/У</p>
                </div>
              </div>
            </div>
            <div>
              <p>Коробка с документами</p>
              <div className={style.negotiable_wrapper}>
                <div className={style.radio_wrapper}>
                  <input name='has_document' type="radio" />
                  <p>Есть</p>
                </div>
                <div className={style.radio_wrapper}>
                  <input name='has_document' type="radio" />
                  <p>Нет</p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.form__color}>
            <p>Цвет телефона</p>
            <div className={style.color_wrapper}>
              {
                [
                  {
                    color: "#ffffff",
                  },
                  {
                    color: "#000000",
                  },
                  {
                    color: "#f5f5f5",
                  },
                  {
                    color: "#40A69F",
                  },
                  {
                    color: "#FFB319",
                  },
                  {
                    color: "#FF4E64",
                  },
                  {
                    color: "#5C33CF",
                  },
                  {
                    color: "#3448F0",
                  }
                ].map((item) => (
                  <div key={item.color} className={style.color_box_wrapper}>
                    <div className={style.color_box} style={{ backgroundColor: item.color }}/>
                  </div>
                ))
              }
            </div>
          </div>
          <div>
            <p>Номер телефона</p>
            <div className={style.phone_wrapper}>
              <div className={style.radio_wrapper}>
                <input name='phone' type="radio" />
                <p>+998931234567</p>
              </div>
              <div className={style.radio_wrapper}>
                <input name='phone' type="radio" />
                <p>+998931234567</p>
              </div>
              <div className={style.radio_wrapper}>
                <input name='phone' type="radio" />
                <p>+998931234567</p>
              </div>
            </div>
          </div>
          <div className={style.form__submit_buttons}>
            <a href="">Предпросмотр</a>
            <button type="button" onClick={handleClickPublishing} >Опубликовать</button>
          </div>
        </form>
          <SuccessCreateModel isOpen={createModal} setIsOpen={setCreateModal} />
      </div>
    </div>
  )
}

export default CreateProduct