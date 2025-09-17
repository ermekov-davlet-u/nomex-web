// services/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL + '/api' }), // укажи нужный URL
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: '/app/auth/login',
                method: 'POST',
                body: { email, password },
            }),
        }),
        register: builder.mutation({
            query: ({ email, phone, password }) => ({
                url: '/app/auth/register',
                method: 'POST',
                body: { email, phone, password },
            }),
        }),
        forgotPassword: builder.mutation({
            query: ({ email }) => ({
                url: '/app/auth/forgotPassword',
                method: 'POST',
                body: { email },
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ email, password }) => ({
                url: '/app/auth/resetPassword',
                method: 'POST',
                body: { email, password },
            }),
        }),
        checkEmail: builder.mutation({
            query: ({ email }) => ({
                url: '/app/auth/check-email',
                method: 'POST',
                body: { email },
            }),
        }),
        checkActivationCode: builder.query({
            query: ({ activationCode, email }) => ({
                url: "/app/auth/checkActivationCode",
                method: "GET",
                params: { activationCode, email },
            }),
        }),
        resendActivationCode: builder.mutation({
            query: ({ email }) => ({
                url: "/app/auth/resendActivationCode",
                method: "POST",
                body: { email },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLazyCheckActivationCodeQuery,
    useResendActivationCodeMutation,
    useResetPasswordMutation,
    useCheckEmailMutation,
    useForgotPasswordMutation
} = authApi;
