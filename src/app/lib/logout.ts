import axiosInstance from "./axiosInterceptor";

/**
 * Logs out the user by calling the logout API endpoint and clearing local storage.
 */
export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout").then(() => localStorage.clear());
  } catch (err) {
    console.error("Logout failed", err);
  }
};
