import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
}

//  Initial State
const initialState: CounterState = {
    value: 0,
}

//  Slice containing reducers which in turn call actions actions that will modify the state
//  In RTK, this is simplified down. Without RTK, you would have a separate file for reducers and actions
const counterSlice = createSlice({
    name: "counter",
    initialState,
    //  This is in place of a dedicated reducer and switch statement in classic Redux
    reducers: {
        increment: (state) => {
            //Does not mutate state. createSlice lets us write mutating code and then creates the copy, applies the change, and overwrites the original state under the hood.
            state.value += 1;
        },
        decrement: (state) => {
            if (state.value > 0) state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    }
})

//directly export actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// directly export reducer
export default counterSlice.reducer;