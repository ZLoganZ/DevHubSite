import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useLayoutEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import LoadingLogo from '../../GlobalSetting/LoadingLogo/LoadingLogo';
import { CHECK_LOGIN_SAGA } from '../../../redux/actionSaga/AuthActionSaga';

const Auth = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const login = useSelector((state: any) => state.authReducer.login);

  useLayoutEffect(() => {
    dispatch(CHECK_LOGIN_SAGA());
  }, []);

  if (login === null) {
    return <LoadingLogo />;
  }

  if (login === false) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <React.Suspense fallback={<LoadingLogo />}>
      <Outlet />
    </React.Suspense>
  );
};

export default Auth;
