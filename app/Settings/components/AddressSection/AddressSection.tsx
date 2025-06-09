import React, { useState, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Modal from "../../ui/Modal";
import styles from "./AddressSection.module.scss";
import {
  getAddresses,
  addAddress,
  deleteAddress,
} from "../../../../endpoints/addresses";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { toast } from "react-toastify";
import { AddressData } from "../../../../types/userData";
import MapComponent from "../../../CreateProduct/components/MapComponent";
import { useGetRegionById, useGetRegions } from "../../../../hooks/user";
import { useRouter } from "next/router";

type Address = {
  _id: string;
  user_id: number;
  name: string;
  full_address: string;
  id: number;
  lat: string;
  long: string;
  address: string;
  is_main: boolean;
  region_id: number | undefined;
  district_id: number | undefined;
};

enum SelectType {
  default = "default",
  manual = "manual",
}

interface Region {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
}

const AddressSection = () => {
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [selectType, setSelectType] = useState<SelectType>(SelectType.default);
  const [selectTypeLocation, setSelectTypeLocation] = useState<SelectType>(
    SelectType.default,
  );

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const [addressData, setAddressData] = useState<AddressData>({
    user_id: Number(user?.id) || 0,
    region_id: null,
    district_id: null,
    name: "",
    lat: null,
    long: null,
    address: "",
  });
  const { data: oneRegion } = useGetRegionById(addressData.region_id || 0);
  const { data: regions } = useGetRegions();

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
    try {
      if (selectTypeLocation === SelectType.manual) {
        const { user_id, name, lat, long, address, region_id, district_id } =
          addressData;

        if (!name || !lat || !long || !address) {
          toast.error("Iltimos, xaritadan to‘liq manzil tanlang");
          return;
        }

        const newAddress: Address = {
          user_id: user_id,
          name,
          lat: lat.toString(),
          long: long.toString(),
          is_main: false, // yoki siz xohlagan qiymat
          address,
          _id: "",
          full_address: "",
          id: 0,
          region_id: undefined,
          district_id: undefined,
        };

        const added = await addAddress(newAddress);
        if (added) {
          setAddresses((prev) => [...prev, added]);
          setAddressData({
            user_id: Number(user?.id) || 0,
            region_id: null,
            district_id: null,
            name: "",
            lat: null,
            long: null,
            address: "",
          });
          setShowForm(false);
          toast.success("Manzil saqlandi");
          router.push("/Profile");
        }
      } else if (selectTypeLocation === SelectType.default) {
        if (!name.trim() || !fullAddress.trim()) {
          toast.error("Manzil va nom bo‘sh bo‘lishi mumkin emas");
          return;
        }

        const newAddress: Address = {
          id: 0,
          user_id: Number(user?.id) || 0,
          name: name.trim(),
          lat: "",
          long: "",
          is_main: false,
          region_id: addressData.region_id || undefined,
          district_id: addressData.district_id || undefined,
          address: fullAddress.trim(),
          _id: "",
          full_address: "",
        };

        const added = await addAddress(newAddress);
        if (added) {
          setAddresses((prev) => [...prev, added]);
          setName("");
          setFullAddress("");
          setShowForm(false);
          toast.success("Manzil qo‘shildi");
          router.push("/Profile");
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  const handleDeleteAddress = async (id: string) => {
    const confirmed = window.confirm("Ишончингиз комилми?");
    if (!confirmed) return;

    const res = await deleteAddress(+id);
    if (res!) {
      toast("something went wrong on deleting");
    }
    if (res !== false) {
      setAddresses((prev) => prev.filter((item) => item._id !== id));
    } else {
      toast.error("Манзилни ўчиришда хатолик юз берди");
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
                  <div>
                    <strong>{address.name}</strong>
                  </div>
                  <div>{address.full_address}</div>
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

        <div className={styles.form}>
          <div className={styles.form__location}>
            <p>Адрес продажи</p>
            <div className={styles.select_buttons_wrapper}>
              <button
                type="button"
                className={
                  styles.select_button +
                  " " +
                  (selectTypeLocation === SelectType.default
                    ? styles.active
                    : "")
                }
                onClick={() => setSelectTypeLocation(SelectType.default)}
              >
                Выбрать
              </button>
              <button
                type="button"
                className={
                  styles.select_button +
                  " " +
                  (selectTypeLocation === SelectType.manual
                    ? styles.active
                    : "")
                }
                onClick={() => setSelectTypeLocation(SelectType.manual)}
              >
                Ввести вручную
              </button>
            </div>

            {selectTypeLocation === SelectType.default ? (
              <div>
                <div>
                  <p className={styles.select_label}>Выбрать регион</p>
                  <select
                    className={styles.select}
                    value={addressData.region_id || ""}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        region_id: +e.target.value,
                        district_id: null, // Reset district when region changes
                      })
                    }
                  >
                    <option disabled value="">
                      Выберите регион
                    </option>
                    {regions?.map((region: Region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className={styles.select_label}>Выбрать город или район</p>
                  <select
                    className={styles.select}
                    value={addressData.district_id || ""}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        district_id: +e.target.value,
                      })
                    }
                    disabled={!addressData.region_id}
                  >
                    <option disabled value="">
                      Выберите город или район
                    </option>
                    {oneRegion?.district?.map((district: District) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <MapComponent
                  addressData={addressData}
                  setAddressData={setAddressData}
                />
              </div>
            )}
          </div>
        </div>

        <button onClick={handleAddAddress} className={styles.button}>
          Сохранить
        </button>
      </Modal>
    </>
  );
};

export default AddressSection;
