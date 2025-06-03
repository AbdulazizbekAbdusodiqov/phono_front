import instance from './instance';
import { toast } from 'react-toastify';

export const getAddresses = async () => {
  try {
    const res = await instance.get('/address');
    return res.data;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Манзилларни олишда хатолик');
  }
};

export const addAddress = async (address: string) => {
  try {
    const res = await instance.post('/address', { address });
    toast.success('Манзил қўшилди');
    return res.data;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Манзил қўшишда хатолик');
  }
};

export const deleteAddress = async (id: string) => {
  try {
    await instance.delete(`/address/${id}`);
    toast.success('Манзил ўчирилди');
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Манзил ўчиришда хатолик');
  }
};
