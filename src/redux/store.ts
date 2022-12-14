import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';

import api from '~/services/api';
import rootReducer from './rootReducer';

// ----------------------------------------------------------------------

const isDev = process.env.NODE_ENV === 'development';

const makeStore = () =>
  configureStore({
    reducer: combineReducers({
      [api.reducerPath]: api.reducer,
      ...rootReducer,
    }),
    middleware: (gdm) => {
      const addOnMiddlewares: any[] = [];
      addOnMiddlewares.push(api.middleware);
      if (isDev) {
        addOnMiddlewares.push(logger);
      }
      return gdm().concat(addOnMiddlewares);
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: isDev });
