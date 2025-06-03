import instance from './instance';
import { toast } from 'react-toastify';

export const getPhones = async (id: number | undefined) => {
  try {
    const res = await instance.get(`/phone-number/byUser/${id}`);
    return res.data;
  } catch (error: any) {
    console.error(error);
    toast.error(
      error.response?.data?.message || 'Телефон номерларини олишда хатолик',
    );
  }
};

export const addPhone = async (phone: string, user_id: number | undefined) => {
  try {
    const res = await instance.post('/phone-number', { user_id, phone });
    toast.success('Телефон рақам қўшилди');
    return res.data;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Телефон қўшишда хатолик');
  }
};

export const deletePhone = async (id: number): Promise<boolean> => {
  try {
    await instance.delete(`/phone-number/${id}`);
    toast.success('Телефон рақам ўчирилди');
    return true;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Телефон ўчиришда хатолик');
    return false;
  }
};
  
