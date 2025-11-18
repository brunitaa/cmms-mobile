import axiosInstance from "../configs/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Verifica si el token de acceso guardado sigue siendo válido.
 * Llama al endpoint /api/users/me.
 */

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
      return response.data; // Usuario válido
    } catch (error) {
      //return error.response.data; // Token inválido o error
      console.log("Error en UserService getMe: ", error.response.data);
      throw new Error(error.response.data);
    }
  }
}

export default new UserService(axiosInstance);
