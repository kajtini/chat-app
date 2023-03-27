import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface LoadingSliceStateProps {
  loading: boolean;
}

const initialState: LoadingSliceStateProps = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    loadingStarted: (state) => {
      state.loading = true;
    },
    loadingEnded: (state) => {
      state.loading = false;
    },
  },
});

export const { loadingStarted, loadingEnded } = loadingSlice.actions;

export const selectLoading = (state: RootState) => state.loading.loading;

export default loadingSlice.reducer;
