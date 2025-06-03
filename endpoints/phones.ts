import instance from './instance';
import { toast } from 'react-toastify';

export const getPhones = async () => {
  try {
    const res = await instance.get('/phone-number');
    return res.data;
  } catch (error: any) {
    console.error(error);
    toast.error(
      error.response?.data?.message || 'Телефон номерларини олишда хатолик',
    );
  }
};

export const addPhone = async (phone: string) => {
  try {
    const res = await instance.post('/phone-number', { phone });
    toast.success('Телефон рақам қўшилди');
    return res.data;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Телефон қўшишда хатолик');
  }
};

export const deletePhone = async (id: string): Promise<boolean> => {
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
  
