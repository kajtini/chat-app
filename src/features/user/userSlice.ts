import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../types/types";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<User>) => {
      if (action.payload) {
        state.user = action.payload;
      }
    },

    loggedOut: (state) => {
      state.user = null;
    },
  },
});

export const { loggedIn, loggedOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
