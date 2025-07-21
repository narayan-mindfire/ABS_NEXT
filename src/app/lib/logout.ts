import axiosInstance from "./axiosInterceptor";

export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout").then(() => localStorage.clear());
  } catch (err) {
    console.error("Logout failed", err);
  }
};
