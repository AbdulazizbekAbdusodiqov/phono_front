import React, { useState } from "react";
import { useFormik } from "formik";
import { useUpdateUser } from "@/hooks/user";
import {
  ArrowRightIcon,
  AvatarIcon,
  CloseIcon,
  DateIcon,
  UploadIcon,
} from "@/public/icons/profile";
import CustomCalendar from "./CustomCalendar";
import styles from "./EditProfileModal.module.scss";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  initialData?: {
    first_name?: string;
    last_name?: string;
    birth_date?: string;
    profile_img?: string;
  };
  onSave?: (data: {
    first_name: string;
    last_name: string;
    birth_date: string;
    profile_img: string;
  }) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  userId,
  initialData = {},
  onSave,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const updateUserMutation = useUpdateUser(userId);

  const formik = useFormik({
    initialValues: {
      first_name: initialData.first_name || "",
      last_name: initialData.last_name || "",
      birth_date: initialData.birth_date || "",
      profile_img: initialData.profile_img || "/img/profile/Avatar.svg",
    },
    onSubmit: async (values) => {
      try {
        if (selectedFile) {
          // Agar fayl tanlangan bo'lsa, FormData yarating
          const formData = new FormData();
          formData.append("first_name", values.first_name.trim());
          formData.append("last_name", values.last_name.trim());
          formData.append("birth_date", values.birth_date);
          formData.append("image", selectedFile);

          await updateUserMutation.mutateAsync(formData);
        } else {
          // Fayl tanlanmagan bo'lsa, oddiy obyekt yuboring
          const dataToSend = {
            first_name: values.first_name.trim(),
            last_name: values.last_name.trim(),
            birth_date: values.birth_date,
            profile_img: values.profile_img,
          };

          await updateUserMutation.mutateAsync(dataToSend);
        }

        if (onSave) {
          onSave(values);
        }
        onClose();
      } catch (error) {
        console.error("Ошибка при сохранении профиля:", error);
      }
    },
  });

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        formik.setFieldValue("profile_img", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateSelect = (date: string) => {
    formik.setFieldValue("birth_date", date);
    setShowCalendar(false);
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) + " г"
    );
  };

  const handleClose = () => {
    setShowCalendar(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Редактировать</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.hrLine} />
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                {formik.values.profile_img ? (
                  <img
                    src={formik.values.profile_img || "/placeholder.svg"}
                    alt="Avatar"
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <AvatarIcon />
                  </div>
                )}
              </div>
              <label className={styles.uploadButton}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: "none" }}
                />
                <UploadIcon />
                Загрузить
              </label>
            </div>

            <div className={styles.formGroup}>
              <label>Имя</label>
              <input
                type="text"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                placeholder="Введите имя"
                className={styles.textInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Фамилия</label>
              <input
                type="text"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                placeholder="Введите фамилию"
                className={styles.textInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.dateInputContainer}>
                <div
                  className={styles.dateDisplay}
                  onClick={() => setShowCalendar(!showCalendar)}
                  style={{ cursor: "pointer", opacity: 1 }}
                >
                  <div className={styles.leftIcon}>
                    <DateIcon />
                    <span className={styles.dateLabel}>День рождения</span>
                  </div>
                  <div className={styles.rightIcon}>
                    <span className={styles.dateValue}>
                      {formatDisplayDate(formik.values.birth_date) ||
                        "Выберите дату"}
                    </span>
                    <ArrowRightIcon />
                  </div>
                </div>
                {showCalendar && (
                  <CustomCalendar
                    selectedDate={formik.values.birth_date}
                    onDateSelect={handleDateSelect}
                    onClose={() => setShowCalendar(false)}
                  />
                )}
                <input
                  type="date"
                  name="birth_date"
                  value={formik.values.birth_date}
                  onChange={formik.handleChange}
                  className={styles.hiddenDateInput}
                />
              </div>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={
                !formik.values.first_name.trim() ||
                !formik.values.last_name.trim()
              }
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
