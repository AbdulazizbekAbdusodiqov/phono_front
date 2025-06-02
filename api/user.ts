import { toast } from "react-toastify";
import instance from "./instance";
import { AddressData } from "../types/userData";

export const getUserPhoneNumbers = async (id: number|string) => {
    try {
        const token = JSON.parse(localStorage.getItem("accessToken") || "");
        const res = await instance.get(`/phone-number/getmynumbers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log(res.data);
        
        return res.data;
    } catch (error: any) {
        console.log(error);
        toast.error(` ${error.response.data.message}`);
    }   
} 

export const getRegions = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("accessToken") || "");
        const res = await instance.get(`/region`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log(res.data);
        
        return res.data;
    } catch (error: any) {
        console.log(error);
        toast.error(` ${error.response.data.message}`);
    }   
}

export const getRegionById = async (id: number) => {
    try {
        const token = JSON.parse(localStorage.getItem("accessToken") || "");
        const res = await instance.get(`/region/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log(res.data);
        
        return res.data;
    } catch (error: any) {
        console.log(error);
        // toast.error(` ${error.response.data.message}`);
    }   
}   

export const getDistricts = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("accessToken") || "");
        const res = await instance.get(`/district`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log(res.data);
        
        return res.data;
    } catch (error: any) {
        console.log(error);
        toast.error(` ${error.response.data.message}`);
    }   
}

export const createAddress = async (data: AddressData) => {
    try {
        const token = JSON.parse(localStorage.getItem("accessToken") || "");
        const res = await instance.post(`/address`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log(res.data);
        
        return res.data;
    } catch (error: any) {
        console.log(error);
        toast.error(` ${error.response.data.message}`);
    }   
}
export const getAddresses = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("accessToken") || "");
        const res = await instance.get(`/address`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log(res.data);
        
        return res.data;
    } catch (error: any) {
        console.log(error);
        toast.error(` ${error.response.data.message}`);
    }   
}
    