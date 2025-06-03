import React, { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Modal from '../../ui/Modal';
import styles from './PhoneSection.module.scss';
import { getPhones, addPhone, deletePhone } from '../../../../api/phones';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

type Phone = {
  _id: string;
  phone: string;
};

const PhoneSection = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );


  const fetchPhones = async (id: String | undefined) => {
    setLoading(true);
    const data = await getPhones(id);
    if (data) setPhones(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPhones(user?.id);
  }, [user?.id]);

  const handleAddPhone = async () => {
    if (!newPhone.trim()) return;

    const added = await addPhone(newPhone.trim());
    if (added) {
      setPhones((prev) => [...prev, added]);
      setNewPhone('');
      setShowForm(false);
    }
  };

  const handleDeletePhone = async (id: string) => {
    const confirmed = window.confirm('Ишончингиз комилми?');
    if (!confirmed) return;

    const res = await deletePhone(id);
    if(res!){
      toast("something went wrong on deleting")
    }
    if (res !== false) {
      setPhones((prev) => prev.filter((item) => item._id !== id));
    }
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
            {loading ? (
              <div className={styles.loader}>Юкланмоқда...</div>
            ) : (
              phones.map((phone) => (
                <div className={styles.subItem} key={phone._id}>
                  <div>{phone.phone}</div>
                  <div
                    className={`${styles.item} ${styles.delete}`}
                    onClick={() => handleDeletePhone(phone._id)}
                  >
                    <RiDeleteBin5Line />
                  </div>
                </div>
              ))
            )}
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
        <button onClick={handleAddPhone} className={styles.button}>
          Получить код
        </button>
      </Modal>
    </>
  );
};

export default PhoneSection;
