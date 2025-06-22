import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/api/app/auth/`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        submitUserData: builder.mutation({
            query: ({
                email,
                firstName,
                lastName,
                idNumber,
                inn,
                passportFront,
                passportBack,
                visaScan,
                isLocal,
            }) => {
                const formData = new FormData();
                if (email) { formData.append("email", email); }
                formData.append("last_name", lastName);
                formData.append("first_name", firstName);
                formData.append("ppt_inn", inn);
                formData.append("ppt_id", idNumber);

                if (passportFront instanceof File)
                    formData.append("front", passportFront, "passport_front.jpg");

                if (passportBack instanceof File)
                    formData.append("back", passportBack, "passport_back.jpg");

                if (!isLocal && visaScan instanceof File)
                    formData.append("visa", visaScan, "visa_scan.jpg");

                return {
                    url: email ? "setUserData" : "editUserData", // путь относительно baseUrl
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
});

export const { useSubmitUserDataMutation } = userApi;
