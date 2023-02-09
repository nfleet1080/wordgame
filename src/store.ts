import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './gameSlice';

export const store = configureStore({
	reducer: {
        game: gameSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
