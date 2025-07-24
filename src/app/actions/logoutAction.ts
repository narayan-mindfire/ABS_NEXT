import axios from "axios";

export const logoutAction = async () => {
  try {
    await axios.post(
      "http://localhost:5001/api/v1/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );
    localStorage.clear();
  } catch (err) {
    throw err;
  }
};
