"use client"

import React, { useState, useRef } from "react"
import { useUpdateUser } from "@/hooks/user"
import { ArrowRightIcon, AvatarIcon, CloseIcon, DateIcon, UploadIcon } from "@/public/icons/profile"
import CustomCalendar from "./CustomCalendar"
import styles from "./EditProfileModal.module.scss"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userId: number
  initialData?: {
    name?: string
    familyName?: string
    birthday?: string
    avatar?: string
  }
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  userId,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    familyName: initialData.familyName || "",
    birthday: initialData.birthday || "",
    avatar: initialData.avatar || "",
  })

  const [showCalendar, setShowCalendar] = useState(false)
  const dateInputRef = useRef<HTMLInputElement>(null)

  const updateUser = useUpdateUser(userId)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setFormData((prev) => ({ ...prev, avatar: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDateIconClick = () => {
    setShowCalendar(!showCalendar)
  }

  const handleDateSelect = (date: string) => {
    setFormData((prev) => ({ ...prev, birthday: date }))
    setShowCalendar(false)
  }

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return (
      date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) + " г"
    )
  }

  const handleSave = () => {
    updateUser.mutate(formData)
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Редактировать</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.hrLine} />
        <div className={styles.modalBody}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarContainer}>
              {formData.avatar ? (
                <img src={formData.avatar} alt="Avatar" className={styles.avatar} />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <AvatarIcon />
                </div>
              )}
            </div>
            <label className={styles.uploadButton}>
              <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: "none" }} />
              <UploadIcon />
              Загрузить
            </label>
          </div>

          <div className={styles.formGroup}>
            <label>Имя</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Имя"
              className={styles.textInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Фамилия</label>
            <input
              type="text"
              value={formData.familyName}
              onChange={(e) => handleInputChange("familyName", e.target.value)}
              placeholder="Фамилия"
              className={styles.textInput}
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.dateInputContainer}>
              <div className={styles.dateDisplay} onClick={handleDateIconClick}>
                <div className={styles.leftIcon}>
                  <DateIcon />
                  <span className={styles.dateLabel}>День рождения</span>
                </div>
                <div className={styles.rightIcon}>
                  <span className={styles.dateValue}>{formatDisplayDate(formData.birthday)}</span>
                  <ArrowRightIcon />
                </div>
              </div>
              {showCalendar && (
                <CustomCalendar
                  selectedDate={formData.birthday}
                  onDateSelect={handleDateSelect}
                  onClose={() => setShowCalendar(false)}
                />
              )}
              <input
                ref={dateInputRef}
                type="date"
                value={formData.birthday}
                onChange={(e) => handleInputChange("birthday", e.target.value)}
                className={styles.hiddenDateInput}
              />
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.saveButton} onClick={handleSave}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfileModal
