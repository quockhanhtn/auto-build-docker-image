import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { RtkTagCons } from '~/constants';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_API_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);
    //   return headers;
    // },
  }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: Object.values(RtkTagCons),
  endpoints: (_builder) => ({
    // omitted, inject endpoints in services
  }),
});

export default api;
