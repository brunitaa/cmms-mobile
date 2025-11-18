import axiosInstance from "../configs/axiosConfig";

class WorkOrderService {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getAllWorkOrders(accessToken) {
    try {
      const response = await this.axiosInstance.get("/work-orders/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default new WorkOrderService(axiosInstance);
