import instance from "./instance";
import { toast } from "react-toastify";

export const getEmails = async (id: number | undefined) => {
  try {
    console.log(
      "keldi: ",
      JSON.parse(localStorage.getItem("accessToken") || ""),
    );
    const res = await instance.get(`/email/byUser/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") || "",
        )}`,
      },
    });
    console.log("keldi4");
    return res.data;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || "Почталарни олишда хатолик");
  }
};

export const addEmail = async (email: string) => {
  try {
    const res = await instance.post("/email", { email });
    toast.success("Почта қўшилди");
    return res.data;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || "Почта қўшишда хатолик");
  }
};

export const deleteEmail = async (id: number, user_id: number | undefined) => {
  try {
    await instance.delete(`/email/${user_id}`);
    toast.success("Почта ўчирилди");
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || "Почта ўчиришда хатолик");
  }
};
