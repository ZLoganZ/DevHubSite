import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Route, Routes } from 'react-router-dom';
import DrawerHOC from './HOC/Drawer/DrawerHOC';
import ModalHOC from './HOC/Modal/ModalHOC';
import Chat from './pages/Chat/Chat';
import GetStarted from './pages/GetStarted/GetStarted';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SelectCommunity from './pages/SelectCommunity/SelectCommunity';
import SelectFollow from './pages/SelectFollow/SelectFollow';
import SelectInterest from './pages/SelectInterest/SelectInterest';
import { setDispatch, setNavigate, setUseSelector } from './redux/Slice/FunctionSlice';
import MainTemplate from './templates/MenuTemplate/MainTemplate';
import ProfileWrapper from './components/Wrapper/ProfileWrapper';
import PostWrapper from './components/Wrapper/PostWrapper';
import PostShareWrapper from './components/Wrapper/PostShareWrapper';
import NewFeed from './pages/NewsFeed/Newsfeed';
import CommunityMember from './pages/Community/CommunityMember';
import React from 'react';
import ActiveStatus from './components/ActionComponent/ActiveStatus/ActiveStatus';
const LazyLoadingAuth = React.lazy(() => import('./components/ActionComponent/Authentication/Auth'));
const LazyLoadingAlreadyAuth = React.lazy(() => import('./components/ActionComponent/Authentication/AlreadyAuth'));
import LoadingLogo from './components/GlobalSetting/LoadingLogo/LoadingLogo';
import NotFound404 from './pages/NotFound404/NotFound404';
import CommunityWrapper from './pages/Community/CommunityWrapper';

const App = () => {
  //Set một số tham số cần thiết trên toàn cục
  const dispatch = useDispatch();
  dispatch(setDispatch(dispatch));

  let navigate = useNavigate();
  dispatch(setNavigate(navigate));

  dispatch(setUseSelector(useSelector));

  return (
    <>
      <ModalHOC />
      <DrawerHOC />
      <ActiveStatus />
      <Routes>
        <Route
          element={
            <React.Suspense fallback={<LoadingLogo />}>
              <LazyLoadingAlreadyAuth />
            </React.Suspense>
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          element={
            <React.Suspense fallback={<LoadingLogo />}>
              <LazyLoadingAuth />
            </React.Suspense>
          }
        >
          <Route path="/" element={<MainTemplate Component={NewFeed} />} />
          <Route path="/message/:conversationID?" element={<Chat />} />
          <Route path="/select-interest" element={<SelectInterest />} />
          <Route path="/select-follow" element={<SelectFollow />} />
          <Route path="/select-community" element={<SelectCommunity />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/user/:userID" element={<MainTemplate Component={ProfileWrapper} />} />
          <Route path="/me" element={<MainTemplate Component={ProfileWrapper} />} />
          <Route path="/post/:postID" element={<MainTemplate Component={PostWrapper} />} />
          <Route path="/postshare/:postID" element={<MainTemplate Component={PostShareWrapper} />} />
          <Route path="/community/:communityID" element={<MainTemplate Component={CommunityWrapper} />} />
          <Route path="*" element={<NotFound404 login={true}/>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
