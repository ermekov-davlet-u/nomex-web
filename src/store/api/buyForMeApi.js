// src/services/buyForMeApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config';

export const buyForMeApi = createApi({
    reducerPath: 'buyForMeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        submitBuyForMe: builder.mutation({
            query: (data) => ({
                url: '/api/app/invoice/createBuyForMe',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useSubmitBuyForMeMutation } = buyForMeApi;
