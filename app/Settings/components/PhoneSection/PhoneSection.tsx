import React, { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Modal from '../../ui/Modal';
import styles from './PhoneSection.module.scss';
import { getFromStorage, setToStorage } from '../../../../utils/local-storege';

const PhoneSection = () => {
  const [phones, setPhones] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    setPhones(getFromStorage('phones') || []);
  }, []);

  const addPhone = () => {
    if (newPhone.trim()) {
      const updated = [...phones, newPhone.trim()];
      setPhones(updated);
      setToStorage('phones', updated);
      setNewPhone('');
      setShowForm(false);
    }
  };

  const deletePhone = (index: number) => {
    const updated = phones.filter((_, i) => i !== index);
    setPhones(updated);
    setToStorage('phones', updated);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item} onClick={() => setOpen(!open)}>
          <span>Номер телефона</span>
          <span className={styles.arrow}>
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
  
        {open && (
          <div className={styles.subsection}>
            {phones.map((phone, i) => (
              <div className={styles.subItem} key={i}>
                <div>{phone}</div>
                <div
                  className={`${styles.item} ${styles.delete}`}
                  onClick={() => deletePhone(i)}
                >
                  <RiDeleteBin5Line />
                </div>
              </div>
            ))}
  
            <div className={styles.addButton} onClick={() => setShowForm(true)}>
              + Добавить номер телефона
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <h3 className={styles.modalTitle}>Добавить номер</h3>
        <input
          type="text"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          placeholder="Введите свой номер телефона"
          className={styles.input}
        />
        <button onClick={addPhone} className={styles.button}>
          Получить код
        </button>
      </Modal>
    </>
  );
};

export default PhoneSection;
