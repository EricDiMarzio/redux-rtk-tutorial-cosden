# Incorporating Redux

## 0. Installs
npm install `react-redux` `@reduxjs/toolkit`

## 1. `store.ts`
- Create a folder called `state`.
- Create a `store.ts` file.
- Add the boilerplate code for the store, excluding any reference to the `counterReducer`.

## 2. Create a Slice of State - `counterSlice`
- Create a type or interface for the state.
- Create a variable called `initialState`, which is an object representing the initial state.
- Create the slice using `createSlice()`:
  - This will receive an object with the following properties:
    - `name`: The name of the slice.
    - `initialState`: The initial state object.
    - `reducers`: The reducers (which create actions under the hood).
      - The actions are what get called to make changes to the state.
      - Reducers can use mutating syntax, which Redux Toolkit converts into non-mutating code under the hood.
- Export the actions as a destructured object from `counterSlice.actions` (for use in components).
- Export the reducer as the default export from `counterSlice.reducer` (for use in `store.ts`).
- Add this slice to the `store.ts`.

## 3. `main.tsx`
- Go to your `main.tsx` or `index.tsx` file.
- Import the `Provider` component from `react-redux` and the `store` from `store.ts`.
- Wrap your `App` component in the `Provider` and pass the `store` as a prop.

## 4. `Counter.tsx`
- Import `useDispatch` and `useSelector` from `react-redux`.
- Import the `RootState` type from your `store.ts`.
- Import all actions you would like to use from your slice.
- Declare a `count` variable using `useSelector`:
  - This is the "read" part of state management.
  - Use it to display state on the screen or update other values based on it.
- Declare a `dispatch` variable using `useDispatch()`:
  - Use this to call actions with `dispatch(action())`.

## 5. Using State with Async Functions
- (Add instructions here for handling asynchronous state updates, such as using `createAsyncThunk` or other middleware.)