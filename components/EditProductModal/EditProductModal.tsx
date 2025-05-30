"use client"

import type React from "react"
import { useState } from "react"
import { CloseIcon } from "@/public/icons/profile"
import styles from "./EditProductModal.module.scss"

interface ProductData {
  id: number
  title: string
  price: string
  location: string
  condition: string
  memory: string
  year: string
  color: string
  hasDocuments: boolean
  description: string
  isNegotiable: boolean
  images: string[]
}

interface EditProductModalProps {
  isOpen: boolean
  onClose: () => void
  productData: ProductData
  onSave: (data: Partial<ProductData>) => void
}

const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, productData, onSave }) => {
  const [formData, setFormData] = useState({
    title: productData.title,
    price: productData.price.replace(" UZS", ""),
    condition: productData.condition,
    memory: productData.memory,
    year: productData.year,
    color: productData.color,
    hasDocuments: productData.hasDocuments,
    description: productData.description,
    isNegotiable: productData.isNegotiable,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    const updatedData = {
      ...formData,
      price: formData.price + " UZS",
    }
    onSave(updatedData)
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Редактировать товар</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.hrLine} />

        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label>Название</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={styles.textInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Цена (UZS)</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className={styles.textInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Состояние</label>
            <select
              value={formData.condition}
              onChange={(e) => handleInputChange("condition", e.target.value)}
              className={styles.selectInput}
            >
              <option value="Новый">Новый</option>
              <option value="Б/у">Б/у</option>
              <option value="Восстановленный">Восстановленный</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Память</label>
            <select
              value={formData.memory}
              onChange={(e) => handleInputChange("memory", e.target.value)}
              className={styles.selectInput}
            >
              <option value="64 GB">64 GB</option>
              <option value="128 GB">128 GB</option>
              <option value="256 GB">256 GB</option>
              <option value="512 GB">512 GB</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Год выпуска</label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => handleInputChange("year", e.target.value)}
              className={styles.textInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Цвет</label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => handleInputChange("color", e.target.value)}
              className={styles.textInput}
            />
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.hasDocuments}
                onChange={(e) => handleInputChange("hasDocuments", e.target.checked)}
              />
              Коробка с документами
            </label>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.isNegotiable}
                onChange={(e) => handleInputChange("isNegotiable", e.target.checked)}
              />
              Торг уместен
            </label>
          </div>

          <div className={styles.formGroup}>
            <label>Описание</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={styles.textArea}
              rows={4}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Отмена
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProductModal
