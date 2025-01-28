import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';

// Define a type for the slice state


interface UserState {
  token:string
}

// Define the initial state using that type
const initialState: UserState = {
  token:'',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducer to update user permissions
    userDataLogin: (state, action: PayloadAction<UserState>) => {
      // Safely merge permissions, avoiding duplicates
      state.token = action.payload.token
    },
  },
});

export const { userDataLogin } = userSlice.actions;

// Selector to access user data in the state
export const selectUserToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
