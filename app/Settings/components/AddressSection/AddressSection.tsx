import React, { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Modal from '../../ui/Modal';
import styles from './AddressSection.module.scss';
import {
  getAddresses,
  addAddress,
  deleteAddress,
} from '../../../../endpoints/addresses';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { toast } from 'react-toastify';

type Address = {
  _id: string;
  address: string;
};

const AddressSection = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, isAuthenticated } = useSelector(
      (state: RootState) => state.auth,
    );

  const fetchAddresses = async (id: number | undefined) => {
    if (!id) return;
    setLoading(true);
    const data = await getAddresses(+id);
    if (data) setAddresses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses(user?.id);
  }, [user?.id]);

  const handleAddAddress = async () => {
    if (!newAddress.trim()) return;

    const added = await addAddress(newAddress.trim());
    if (added) {
      setAddresses((prev) => [...prev, added]);
      setNewAddress('');
      setShowForm(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    const confirmed = window.confirm('Ишончингиз комилми?');
    if (!confirmed) return;

    const res = await deleteAddress(+id);
    if(res!){
          toast("something went wrong on deleting")
        }
    if (res !== false) {
      setAddresses((prev) => prev.filter((item) => item._id !== id));
    } else {
      toast.error('Манзилни ўчиришда хатолик юз берди');
    }
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
            {loading ? (
              <div className={styles.loader}>Юкланмоқда...</div>
            ) : (
              addresses.map((address) => (
                <div className={styles.subItem} key={address._id}>
                  <div>{address.address}</div>
                  <div
                    className={`${styles.item} ${styles.delete}`}
                    onClick={() => handleDeleteAddress(address._id)}
                  >
                    <RiDeleteBin5Line />
                  </div>
                </div>
              ))
            )}

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
        <button onClick={handleAddAddress} className={styles.button}>
          Сохранить
        </button>
      </Modal>
    </>
  );
};

export default AddressSection;
