import React, { useEffect, useState } from 'react';
import StyleTotal from './cssForgotPassword';
import { ConfigProvider } from 'antd';
import { getTheme } from '../../util/functions/ThemeFunction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CHECK_RESET_PASSWORD_SAGA, RESET_PASSWORD_SAGA } from '../../redux/actionSaga/AuthActionSaga';

export const ResetPassword = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const email = params.get('email');

  const [password, setPassword] = useState('');

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (!email) {
      navigate('/forgot');
    }

    if (email) {
      dispatch(CHECK_RESET_PASSWORD_SAGA({ email: email }));
    }
  }, [email]);

  const handleSubmit = () => {
    if (password === confirmPassword) {
      dispatch(
        RESET_PASSWORD_SAGA({
          email: email,
          password: password,
        }),
      );
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <h1>ResetPassword</h1>
        <label htmlFor="password" className="mr-3">
          Password
        </label>
        <input type="password" name="password" id="password" onChange={handleChangePassword} />
        <label htmlFor="confirmPassword" className="mr-3">
          Confirm Password
        </label>
        <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleChangeConfirmPassword} />
        <button className="btnNext ml-3 mr-3 px-3 py-1" onClick={handleSubmit}>
          Next
        </button>
        <button className="btnBack mr-3 px-3 py-1" onClick={() => navigate('/forgot')}>
          Back
        </button>
      </StyleTotal>
    </ConfigProvider>
  );
};
