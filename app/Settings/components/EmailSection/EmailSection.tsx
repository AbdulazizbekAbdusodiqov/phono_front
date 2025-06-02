import React, { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Modal from '../../ui/Modal';
import styles from './EmailSection.module.scss';
import {
  getEmails,
  addEmail as apiAddEmail,
  deleteEmail as apiDeleteEmail,
} from '../../../../api/emails'; // import qiling

const EmailSection = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Serverdan email ro'yxatini olish
  const fetchEmails = async () => {
    setLoading(true);
    const data = await getEmails();
    if (data && Array.isArray(data)) {
      setEmails(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  // Email qo'shish
  const addEmail = async () => {
    if (!newEmail.trim()) return;

    setLoading(true);
    const addedEmail = await apiAddEmail(newEmail.trim());
    setLoading(false);

    if (addedEmail) {
      // serverdan qaytgan yangi email ro'yxatini qaytarishiga qarab o'zgartiring,
      // yoki faqat yangi emailni qo'shish mumkin:
      setEmails((prev) => [...prev, addedEmail.email || newEmail.trim()]);
      setNewEmail('');
      setShowForm(false);
    }
  };

  // Email o'chirish
  const deleteEmail = async (index: number) => {
    const emailToDelete = emails[index];
    if (!emailToDelete) return;

    setLoading(true);

    // Agar serverdan emailni id bilan o'chirish kutilsa,
    // sizga email id sini olish va o'sha bilan o'chirish kerak bo'ladi.
    // Hozirgi misolda faqat index bilan ishlayapmiz,
    // shuning uchun serverdagi id lar bilan ishlash uchun emails ni id bilan o'zgartiring.

    // Misol uchun, emails massivida id va email obyekti bo'lsa:
    // const { id } = emails[index];
    // await apiDeleteEmail(id);

    // Lekin sizda faqat stringlar bor, shuning uchun bu yerni moslashtiring.

    // Agar emails massivida id yo'q bo'lsa, bu funksiya ishlamasligi mumkin.

    // Shu sababli, emails ni quyidagicha saqlash tavsiya qilinadi:
    // [{ id: string, email: string }, ...]
    // va keyin shu id bilan o'chirish.

    // Hozirgi kodni server bilan ishlash uchun shunday qiling:

    const id = emailToDelete; // Agar id va email bir xil bo'lsa

    await apiDeleteEmail(id);

    setEmails((prev) => prev.filter((_, i) => i !== index));
    setLoading(false);
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
            {loading && <div>Loading...</div>}

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
        <button onClick={addEmail} className={styles.button} disabled={loading}>
          Сохранить
        </button>
      </Modal>
    </>
  );
};

export default EmailSection;
