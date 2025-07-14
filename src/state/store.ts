import {configureStore} from "@reduxjs/toolkit";
import counterReducer from './reducers/counterSlice'
import teamReducer from './reducers/teamSlice'
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        team: teamReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
