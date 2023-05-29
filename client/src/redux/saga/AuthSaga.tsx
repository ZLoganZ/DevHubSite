import { put, select, takeLatest } from 'redux-saga/effects';
import { authService } from '../../services/AuthService';
import { DARK_THEME, STATUS_CODE, TOKEN, TOKEN_GITHUB } from '../../util/constants/SettingSystem';
import {
  CHECK_LOGIN_SAGA,
  CHECK_RESET_PASSWORD_SAGA,
  CHECK_VERIFY_CODE_SAGA,
  FORGOT_PASSWORD_SAGA,
  GET_USER_ID,
  LOGIN_SAGA,
  LOGIN_WITH_GOOGLE_SAGA,
  LOGOUT_SAGA,
  RESET_PASSWORD_SAGA,
  VERIFY_CODE_SAGA,
} from '../actionSaga/AuthActionSaga';
import { setLogin, setUserID } from '../Slice/AuthSlice';
import { setTheme } from '../Slice/ThemeSlice';

// LoginSaga
function* LoginSaga({ payload }: any) {
  try {
    const { data, status } = yield authService.login(payload.userLogin);
    if (status === STATUS_CODE.SUCCESS) {
      // Lưu token vào localStorage
      localStorage.setItem(TOKEN, JSON.stringify(data.content?.accessToken));

      // Lưu theme vào localStorage
      yield put(setTheme({ theme: DARK_THEME }));

      window.location.replace('/');
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* theoDoiLoginSaga() {
  yield takeLatest(LOGIN_SAGA, LoginSaga);
}

// Logout
function* LogoutSaga() {
  try {
    const token = localStorage.getItem(TOKEN);

    const userAuth = {
      accessToken: token,
    };
    const { data, status } = yield authService.logout(userAuth);
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(TOKEN_GITHUB);

      window.location.replace('/login');
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* theoDoiLogoutSaga() {
  yield takeLatest(LOGOUT_SAGA, LogoutSaga);
}

// Get User ID
function* getUserIDSaga() {
  try {
    const token = localStorage.getItem(TOKEN);
    const userAuth = {
      accessToken: token,
    };
    const { data, status } = yield authService.getUserID(userAuth);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(setUserID({ userID: data.content }));
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* theoDoiGetUserIDSaga() {
  yield takeLatest(GET_USER_ID, getUserIDSaga);
}

// Login with Google
function* LoginWithGoogleSaga({ payload }: any) {
  try {
    const { data, status } = yield authService.loginWithGoogle(payload);
    if (status === STATUS_CODE.SUCCESS) {
      // Lưu token vào localStorage
      localStorage.setItem(TOKEN, JSON.stringify(data.content?.accessToken));

      // Lưu theme vào localStorage
      yield put(setTheme({ theme: DARK_THEME }));

      window.location.replace('/');
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* theoDoiLoginWithGoogleSaga() {
  yield takeLatest(LOGIN_WITH_GOOGLE_SAGA, LoginWithGoogleSaga);
}

// Check Login Saga
function* CheckLoginSaga() {
  try {
    const token = localStorage.getItem(TOKEN);
    const userAuth = {
      accessToken: token,
    };
    const { data, status } = yield authService.checkLogin(userAuth);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(setLogin({ login: true }));
    } else {
      yield put(setLogin({ login: false }));
    }
  } catch (err: any) {
    yield put(setLogin({ login: false }));
    console.log(err);
  }
}

export function* theoDoiCheckLoginSaga() {
  yield takeLatest(CHECK_LOGIN_SAGA, CheckLoginSaga);
}

// Forgot Password Saga
function* ForgotPasswordSaga({ payload }: any) {
  try {
    const { data, status } = yield authService.forgotPassword(payload);
    if (status === STATUS_CODE.SUCCESS) {
      const { navigate } = yield select((state) => state.functionReducer);

      navigate({
        pathname: '/verify',
        search: `?email=${payload.email}&code=${Math.floor(
          Math.random() * 1000000,
        )}&note=codetrongemailchukhongphaicodenaydaunehihi`,
      });
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* theoDoiForgotPasswordSaga() {
  yield takeLatest(FORGOT_PASSWORD_SAGA, ForgotPasswordSaga);
}

// Verify Code Saga
function* VerifyCodeSaga({ payload }: any) {
  try {
    const { data, status } = yield authService.verifyCode(payload);
    if (status === STATUS_CODE.SUCCESS) {
      const { navigate } = yield select((state) => state.functionReducer);

      navigate({
        pathname: '/reset',
        search: `?email=${payload.email}&code=${Math.floor(
          Math.random() * 1000000,
        )}&note=codetrongemailchukhongphaicodenaydaunehihi`,
      });
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* theoDoiVerifyCodeSaga() {
  yield takeLatest(VERIFY_CODE_SAGA, VerifyCodeSaga);
}

// Reset Password Saga
function* ResetPasswordSaga({ payload }: any) {
  try {
    const { data, status } = yield authService.resetPassword(payload);
    if (status === STATUS_CODE.SUCCESS) {
      const { navigate } = yield select((state) => state.functionReducer);

      navigate('/login');
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* theoDoiResetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD_SAGA, ResetPasswordSaga);
}

// Check Verify Code Saga
function* CheckVerifyCodeSaga({ payload }: any) {
  try {
    const { data, status } = yield authService.checkVerifyCode(payload);
    if (status === STATUS_CODE.SUCCESS) {
      // Do nothing
    } else {
      const { navigate } = yield select((state) => state.functionReducer);

      navigate('/forgot');
    }
  } catch (err: any) {
    const { navigate } = yield select((state) => state.functionReducer);

    navigate('/forgot');
    console.log(err);
  }
}

export function* theoDoiCheckVerifyCodeSaga() {
  yield takeLatest(CHECK_VERIFY_CODE_SAGA, CheckVerifyCodeSaga);
}

// Check Reset Password Saga
function* CheckResetPasswordSaga({ payload }: any) {
  try {
    const { data, status } = yield authService.checkResetPassword(payload);
    if (status === STATUS_CODE.SUCCESS) {
      // Do nothing
    } else {
      const { navigate } = yield select((state) => state.functionReducer);

      navigate('/forgot');
    }
  } catch (err: any) {
    const { navigate } = yield select((state) => state.functionReducer);

    navigate('/forgot');
    console.log(err);
  }
}

export function* theoDoiCheckResetPasswordSaga() {
  yield takeLatest(CHECK_RESET_PASSWORD_SAGA, CheckResetPasswordSaga);
}
