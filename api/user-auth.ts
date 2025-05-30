import axios from "axios";
import { toast } from "react-toastify";
import instance from "./instance";

export const sendOtp = async (phone_number: string) => {
  try {
    const res = await instance.post("/otp/send", { phone_number });
    return res.data;
  } catch (error: any) {
    console.log(error);
    toast.error(`Faild to register user ${error?.response?.data?.message}`);
  }
};

export const verifyOtp = async (data: any) => {
  try {
    const res = await instance.post("/otp/verify", data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    toast.error(` ${error.response.data.message}`);
  }
};

export const signUpUser = async (data: any) => {
  try {
    const res = await instance.post("/user-auth/sign-up", data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    toast.error(` ${error.response.data.message}`);
  }
};

export const loginUser = async (data: any) => {
  try {
    const res = await instance.post("/user-auth/login", data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    toast.error(` ${error.response.data.message}`);
  }
};
