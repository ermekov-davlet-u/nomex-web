import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config";

export const storeApi = createApi({
    reducerPath: "storeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/api/store/`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getStoresList: builder.query({
            query: (guid) => {

                return `/storeList`;
            },
        }),
        getStoreByGuid: builder.query({
            query: (guid) => {
                if (!guid) throw new Error("GUID is required");
                return `/storeList`;
            },
        }),
    }),
});

export const { useGetStoresListQuery } = storeApi;