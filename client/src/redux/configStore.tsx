import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slice/UserSlice';
import authReducer from './Slice/AuthSlice';
import functionReducer from './Slice/FunctionSlice';
import loadingReducer from './Slice/LoadingSlice';
import themeReducer from './Slice/ThemeSlice';
import postReducer from './Slice/PostSlice';
import drawerHOCReducer from './Slice/DrawerHOCSlice';
import modalHOCReducer from './Slice/ModalHOCSlice';
import activeListReducer from './Slice/ActiveListSlice';
import conversationReducer from './Slice/ConversationSlice';
import getStartedReducer from './Slice/GetStartedSlice';
import communityReducer from './Slice/CommunitySlide';

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export default configureStore({
  reducer: {
    userReducer,
    authReducer,
    functionReducer,
    loadingReducer,
    themeReducer,
    postReducer,
    drawerHOCReducer,
    modalHOCReducer,
    activeListReducer,
    conversationReducer,
    getStartedReducer,
    communityReducer,
  },
  middleware,
});

// Hàm run nhận vào 1 generator function
sagaMiddleware.run(rootSaga);
