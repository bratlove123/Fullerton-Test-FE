import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { SET_USER_INFO } from "reçdux/global/auth/action";
import Auth from "utils/auth";

export const useAuth = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const checkAuthentication = useCallback(async () => {
    const userInfo = await Auth.getUserInfo();
    setIsCheckingAuth(false);
    setIsLoggedIn(!!userInfo);

    // // Update auth store
    // if (userInfo) {
    //   dispatch({
    //     type: SET_USER_INFO,
    //     payload: userInfo?.idToken?.payload,
    //   });
    // }
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return [isCheckingAuth, isLoggedIn];
};
