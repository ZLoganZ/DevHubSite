import { put, select, takeLatest } from 'redux-saga/effects';
import { userService } from '../../services/UserService';
import { STATUS_CODE, TOKEN } from '../../util/constants/SettingSystem';
import { REGIS_USER_SAGA, UPDATE_USER_SAGA } from '../actionSaga/UserActionSaga';
import { setUser } from '../Slice/UserSlice';

// registerUser Saga
function* registerUserSaga({ payload }: any) {
  try {
    const { data, status } = yield userService.registerUser(payload.userRegister);
    if (status === STATUS_CODE.CREATED) {
      localStorage.setItem(TOKEN, JSON.stringify(data.content.accessToken));
    }
  } catch (err: any) {
    localStorage.removeItem(TOKEN);
    console.log(err.response.data);
  }
}

export function* theoDoiRegisterUserSaga() {
  yield takeLatest(REGIS_USER_SAGA, registerUserSaga);
}

// Update User Saga
function* updateUserSaga({ payload }: any) {
  try {
    const { data, status } = yield userService.updateUser(payload.id, payload.userUpdate);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(setUser(data.content));
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiUpdateUserSaga() {
  yield takeLatest(UPDATE_USER_SAGA, updateUserSaga);
}
