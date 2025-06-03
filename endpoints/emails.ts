import instance from './instance';
import { toast } from 'react-toastify';

export const getEmails = async () => {
  try {
    const res = await instance.get('/email');
    return res.data;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Почталарни олишда хатолик');
  }
};

export const addEmail = async (email: string) => {
  try {
    const res = await instance.post('/email', { email });
    toast.success('Почта қўшилди');
    return res.data;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Почта қўшишда хатолик');
  }
};

export const deleteEmail = async (id: string) => {
  try {
    await instance.delete(`/email/${id}`);
    toast.success('Почта ўчирилди');
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Почта ўчиришда хатолик');
  }
};
