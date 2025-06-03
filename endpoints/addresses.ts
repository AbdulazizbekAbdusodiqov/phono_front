import instance from './instance';
import { toast } from 'react-toastify';

export const getAddresses = async (id: number | undefined) => {
  try {
    const res = await instance.get(`/address/byUser/${id}`);
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

export const deleteAddress = async (id: number) => {
  try {
    await instance.delete(`/address/${id}`);
    toast.success('Манзил ўчирилди');
    return true;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Манзил ўчиришда хатолик');
    return false
  }
};
