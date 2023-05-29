import React, { useState } from 'react';
import StyleTotal from './cssForgotPassword';
import { ConfigProvider } from 'antd';
import { getTheme } from '../../util/functions/ThemeFunction';
import { useDispatch, useSelector } from 'react-redux';
import { FORGOT_PASSWORD_SAGA } from '../../redux/actionSaga/AuthActionSaga';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(FORGOT_PASSWORD_SAGA({ email: email }));
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <h1>ForgotPassword</h1>
        <label htmlFor="email" className="mr-3">
          Email
        </label>
        <input type="email" name="email" id="email" onChange={handleChangeEmail} />
        <button className="btnNext ml-3 mr-3 px-3 py-1" onClick={handleSubmit}>
          Send
        </button>
        <button className="btnBack mr-3 px-3 py-1" onClick={() => navigate('/login')}>
          Back
        </button>
      </StyleTotal>
    </ConfigProvider>
  );
};
