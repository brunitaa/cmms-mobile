import AsyncStorage from "@react-native-async-storage/async-storage";

import axiosInstance from "../configs/axiosConfig";

class AuthService {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async signIn(email, password) {
    try {
      const res = await this.axiosInstance.post("/auth/sign-in", {
        email,
        password,
      });
      console.log("AUTHSERVICE: ", res.data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async signOut(refreshToken) {
    try {
      console.log("REFRESHTOKEN EN AUTHSERVICE: ", refreshToken);
      const res = await this.axiosInstance.post(
        "/auth/sign-out",
        {},
        {
          headers: { Authorization: `Bearer ${refreshToken}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async forgotPassword(email) {
    try {
      const res = await this.axiosInstance.post("/auth/password/forgot", {
        email,
      });
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async resetPassword(email, newPassword, otp) {
    try {
      const res = await this.axiosInstance.post("/auth/password/reset", {
        email,
        otp,
        newPassword,
      });
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async verifyAccessToken(accessToken) {
    try {
      const res = await this.axiosInstance.post(
        "/auth/token/access/verify",
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async refreshAccessToken() {
    try {
      const res = await this.axiosInstance.post(
        "/auth/token/access/refresh",
        {}
      );
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default new AuthService(axiosInstance);
