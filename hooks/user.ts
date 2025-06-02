import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserPhoneNumbers, createAddress, getRegions, getDistricts, getRegionById } from "../api/user";
import { AddressData } from "../types/userData";


export const useUserPhoneNumbers = (id: number) => {
    console.log(id);
    
    const { data, isLoading, error } = useQuery({
        queryKey: ["user_phone_numbers", id],
        queryFn: () => getUserPhoneNumbers(id),
    });
    return { data, isLoading, error };
}

export const useCreateAddress = (addressData: AddressData) => {
    useMutation({
        mutationFn: () => createAddress(addressData),
    });
}
    
export const useGetRegions = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["regions"],
        queryFn: () => getRegions(),
    });
    return { data, isLoading, error };
}
export const useGetRegionById = (id: number) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["region", id],
        queryFn: () => getRegionById(id),
    });
    return { data, isLoading, error };
}

export const useGetDistricts = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["districts"],
        queryFn: () => getDistricts(),
    });
    return { data, isLoading, error };
}
