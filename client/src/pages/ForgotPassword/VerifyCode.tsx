import React, { useEffect, useState } from 'react';
import StyleTotal from './cssForgotPassword';
import { ConfigProvider } from 'antd';
import { getTheme } from '../../util/functions/ThemeFunction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CHECK_VERIFY_CODE_SAGA, VERIFY_CODE_SAGA } from '../../redux/actionSaga/AuthActionSaga';

export const VerifyCode = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const email = params.get('email');

  const [code, setCode] = useState('');

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    if (!email) {
      navigate('/forgot');
    }

    if (email) {
      dispatch(CHECK_VERIFY_CODE_SAGA({ email: email }));
    }
  }, [email]);

  const handleSubmit = () => {
    if (code === params.get('code')) {
      window.alert('Lêu lêu, bị lừa rồi đó, đừng nhập code này nữa nha, đọc note kìa!');
    }
    dispatch(VERIFY_CODE_SAGA({ email: email, code: code }));
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <h1>VerifyCode</h1>
        <label htmlFor="code" className="mr-3">
          Code
        </label>
        <input type="text" name="code" id="code" onChange={handleChangeCode} />
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
