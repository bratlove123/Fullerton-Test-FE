class Authentication {
  constructor() {
    this.userInfo = null;
    this.jwtToken = null;
  }

  getUserInfo = async () => {
    try {
      const token = localStorage.getItem("AppToken");
      this.jwtToken = token;
      this.userInfo = this.parseJwt(token);
      if (this.userInfo.exp * 1000 < new Date().getTime()) return false;
      return this.userInfo;
    } catch (error) {
      return false;
    }
  };

  setToken = (token) => {
    localStorage.setItem("AppToken", token);
  };

  clearToken = () => {
    localStorage.removeItem("AppToken");
  };

  getToken = () => {
    return this.jwtToken;
  };

  getUserId = () => {
    return this.userInfo.sub;
  };

  getUserInfos = () => {
    return this.userInfo;
  };

  isAdmin = () => {
    return this.userInfo.role.includes("Admin");
  };

  parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };
}

export default new Authentication();
