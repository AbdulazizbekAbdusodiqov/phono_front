import React, { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Modal from '../../ui/Modal';
import styles from './EmailSection.module.scss';
import { getFromStorage, setToStorage } from '../../../../utils/local-storege';

const EmailSection = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    setEmails(getFromStorage('emails') || []);
  }, []);

  const addEmail = () => {
    if (newEmail.trim()) {
      const updated = [...emails, newEmail.trim()];
      setEmails(updated);
      setToStorage('emails', updated);
      setNewEmail('');
      setShowForm(false);
    }
  };

  const deleteEmail = (index: number) => {
    const updated = emails.filter((_, i) => i !== index);
    setEmails(updated);
    setToStorage('emails', updated);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item} onClick={() => setOpen(!open)}>
          <span>Почта</span>
          <span className={styles.arrow}>
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
  
        {open && (
          <div className={styles.subsection}>
            {emails.map((email, i) => (
              <div className={styles.subItem} key={i}>
                <div>{email}</div>
                <div
                  className={`${styles.item} ${styles.delete}`}
                  onClick={() => deleteEmail(i)}
                >
                  <RiDeleteBin5Line />
                </div>
              </div>
            ))}
  
            <div className={styles.addButton} onClick={() => setShowForm(true)}>
              + Добавить почту
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <h3 className={styles.modalTitle}>Добавить почту</h3>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Введите email"
          className={styles.input}
        />
        <button onClick={addEmail} className={styles.button}>
          Сохранить
        </button>
      </Modal>
    </>
  );
};

export default EmailSection;
