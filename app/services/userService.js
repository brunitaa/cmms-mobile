import axiosInstance from "../configs/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

class UserService {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getMe(accessToken) {
    console.log("AccessToken en UserService getMe: ", accessToken);
    try {
      const response = await this.axiosInstance.get("/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.log("Error en UserService getMe: ", error.response.data);
      throw new Error(error.response.data);
    }
  }
}

export default new UserService(axiosInstance);
