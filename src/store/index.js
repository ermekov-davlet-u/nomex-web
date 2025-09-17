import { configureStore, createAction } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { orderApi } from './api/orderApi';
import authReducer from "./slice/authSlice";
import { recipientApi } from './api/recipientApi';
import { buyForMeApi } from './api/buyForMeApi';
import { storeApi } from './api/storeApi';
import { notificationsApi } from './api/notificationsApi';

// экшен для сброса состояния
export const resetStore = createAction('reset/store');

const appReducer = {
	auth: authReducer,
	[authApi.reducerPath]: authApi.reducer,
	[orderApi.reducerPath]: orderApi.reducer,
	[recipientApi.reducerPath]: recipientApi.reducer,
	[buyForMeApi.reducerPath]: buyForMeApi.reducer,
	[storeApi.reducerPath]: storeApi.reducer,
	[notificationsApi.reducerPath]: notificationsApi.reducer,
};

const rootReducer = (state, action) => {
	if (action.type === resetStore.type) {
		state = undefined; // сброс всего состояния
	}
	return Object.keys(appReducer).reduce((acc, key) => {
		acc[key] = appReducer[key](state?.[key], action);
		return acc;
	}, {});
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			orderApi.middleware,
			buyForMeApi.middleware,
			storeApi.middleware,
			notificationsApi.middleware,
			recipientApi.middleware
		),
});
