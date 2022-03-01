import http from "utils/httpService";

export class AuthService {
  static async signIn(params) {
    return http.post("/auth/signin", params);
  }
}
