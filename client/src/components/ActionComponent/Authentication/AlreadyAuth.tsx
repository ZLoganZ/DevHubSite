import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingLogo from '../../GlobalSetting/LoadingLogo/LoadingLogo';
import { CHECK_LOGIN_SAGA } from '../../../redux/actionSaga/AuthActionSaga';

const AlreadyAuth = () => {
  const dispatch = useDispatch();

  const login = useSelector((state: any) => state.authReducer.login);

  useEffect(() => {
    if (login !== null) return;

    dispatch(CHECK_LOGIN_SAGA());
  }, []);

  if (login === null) {
    return <LoadingLogo />;
  }

  if (login === true) {
    return <Navigate to="/" replace />;
  }

  return (
    <React.Suspense fallback={<LoadingLogo />}>
      <Outlet />
    </React.Suspense>
  );
};

export default AlreadyAuth;
