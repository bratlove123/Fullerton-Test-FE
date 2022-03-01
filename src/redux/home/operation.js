import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  CANCEL_BOOKING,
  CANCEL_BOOKING_FAIL,
  CANCEL_BOOKING_SUCCESS,
  CHANGE_STATUS,
  CHANGE_STATUS_FAIL,
  CHANGE_STATUS_SUCCESS,
  CREATE_BOOKING,
  CREATE_BOOKING_FAIL,
  CREATE_BOOKING_SUCCESS,
  GET_BOOKINGS,
  GET_BOOKINGS_FAIL,
  GET_BOOKINGS_SUCCESS,
  GET_BOOKING_TYPES,
  GET_BOOKING_TYPES_FAIL,
  GET_BOOKING_TYPES_SUCCESS,
  HIDE_CREATE_DIALOG,
} from "./action";
import { Auth } from "utils";
import { BookingService } from "services/bookingService";
import { SET_USER_INFO } from "redux/global/action";

export const getAllBookings = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    dispatch({ type: GET_BOOKINGS });
    const bookings = await BookingService.getBookings();
    const user = Auth.getUserInfos();
    dispatch({ type: SET_USER_INFO, payload: user });
    dispatch(hideLoading());
    dispatch({
      type: GET_BOOKINGS_SUCCESS,
      payload: bookings,
    });
  } catch (err) {
    dispatch({ type: GET_BOOKINGS_FAIL, err });
    dispatch(hideLoading());
  }
};

export const getUserBookings = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    dispatch({ type: GET_BOOKINGS });
    const res = await BookingService.getUserBookings(Auth.getUserId());
    const user = Auth.getUserInfos();
    dispatch({ type: SET_USER_INFO, payload: user });
    dispatch(hideLoading());
    dispatch({
      type: GET_BOOKINGS_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({ type: GET_BOOKINGS_FAIL, err });
    dispatch(hideLoading());
  }
};

export const getBookingTypes = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    dispatch({ type: GET_BOOKING_TYPES });
    const res = await BookingService.getBookingTypes();
    dispatch(hideLoading());
    dispatch({
      type: GET_BOOKING_TYPES_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({ type: GET_BOOKING_TYPES_FAIL, err });
    dispatch(hideLoading());
  }
};

export const createBooking = (params) => async (dispatch) => {
  try {
    dispatch(showLoading());
    dispatch({ type: CREATE_BOOKING });
    const res = await BookingService.create(params);
    dispatch(hideLoading());
    dispatch({
      type: CREATE_BOOKING_SUCCESS,
      payload: res,
    });
    dispatch({
      type: HIDE_CREATE_DIALOG,
    });
    if (Auth.isAdmin()) {
      dispatch(getAllBookings());
    } else {
      dispatch(getUserBookings());
    }
  } catch (err) {
    dispatch({ type: CREATE_BOOKING_FAIL, err });
    dispatch(hideLoading());
  }
};

export const cancelBooking = (params) => async (dispatch) => {
  try {
    dispatch(showLoading());
    dispatch({ type: CANCEL_BOOKING });
    const res = await BookingService.cancelBooking(params);
    dispatch(hideLoading());
    dispatch({
      type: CANCEL_BOOKING_SUCCESS,
      payload: res,
    });
    if (Auth.isAdmin()) {
      dispatch(getAllBookings());
    } else {
      dispatch(getUserBookings());
    }
  } catch (err) {
    dispatch({ type: CANCEL_BOOKING_FAIL, err });
    dispatch(hideLoading());
  }
};

export const changeStatus = (params) => async (dispatch) => {
  try {
    dispatch(showLoading());
    dispatch({ type: CHANGE_STATUS });
    const res = await BookingService.changeStatusBooking(params);
    dispatch(hideLoading());
    dispatch({
      type: CHANGE_STATUS_SUCCESS,
      payload: res,
    });
    if (Auth.isAdmin()) {
      dispatch(getAllBookings());
    } else {
      dispatch(getUserBookings());
    }
  } catch (err) {
    dispatch({ type: CHANGE_STATUS_FAIL, err });
    dispatch(hideLoading());
  }
};
