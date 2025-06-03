import React, { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Modal from '../../ui/Modal';
import styles from './AddressSection.module.scss';
import { getFromStorage, setToStorage } from '../../../../utils/local-storege';

const AddressSection = () => {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    setAddresses(getFromStorage('addresses') || []);
  }, []);

  const addAddress = () => {
    if (newAddress.trim()) {
      const updated = [...addresses, newAddress.trim()];
      setAddresses(updated);
      setToStorage('addresses', updated);
      setNewAddress('');
      setShowForm(false);
    }
  };
  

  const deleteAddress = (index: number) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    setToStorage('addresses', updated);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item} onClick={() => setOpen(!open)}>
          <span>Адрес</span>
          <span className={styles.arrow}>
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
  
        {open && (
          <div className={styles.subsection}>
            {addresses.map((address, i) => (
              <div className={styles.subItem} key={i}>
                <div>{address}</div>
                <div
                  className={`${styles.item} ${styles.delete}`}
                  onClick={() => deleteAddress(i)}
                >
                  <RiDeleteBin5Line />
                </div>
              </div>
            ))}
  
            <div className={styles.addButton} onClick={() => setShowForm(true)}>
              + Добавить адрес
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <h3 className={styles.modalTitle}>Добавить адрес</h3>
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Введите адрес"
          className={styles.input}
        />
        <button onClick={addAddress} className={styles.button}>
          Сохранить
        </button>
      </Modal>
    </>
  );
};

export default AddressSection;
