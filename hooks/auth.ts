import { useMutation } from "@tanstack/react-query";
import { loginUser, sendOtp, signUpUser, verifyOtp } from "../api/user-auth";

export const useSendOtp = () =>
  useMutation({
    mutationFn: (phone_number: string) => sendOtp(phone_number),
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: ({
      verification_key,
      code,
    }: {
      verification_key: string;
      code: string;
    }) => verifyOtp({ verification_key, code }),
  });

export const useSignUp = () =>
  useMutation({
    mutationFn: (user: any) => signUpUser(user),
  });

export const useLogin = () =>
  useMutation({
    mutationFn: ({
      phone_number,
      password,
    }: {
      phone_number: string;
      password: string;
    }) => loginUser({ phone_number, password }),
  });
