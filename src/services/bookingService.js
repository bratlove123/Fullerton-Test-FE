import http from "utils/httpService";

export class BookingService {
  static async create(params) {
    return http.post("/booking", params);
  }

  static async getBookings() {
    return http.get("/booking");
  }

  static async getUserBookings(id) {
    return http.get(`/booking/user/${id}`);
  }

  static async cancelBooking(params) {
    return http.put("/booking/cancel", params);
  }

  static async changeStatusBooking(params) {
    return http.put("/booking/update", params);
  }

  static async getBookingTypes() {
    return http.get(`/booking-type`);
  }
}
