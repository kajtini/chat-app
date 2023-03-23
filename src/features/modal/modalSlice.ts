import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Modal {
  isOpen: boolean;
}

const initialState: Modal = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpened: (state) => {
      state.isOpen = true;
    },

    modalClosed: (state) => {
      state.isOpen = false;
    },
  },
});

export const selectIsOpen = (state: RootState) => state.modal.isOpen;

export const { modalOpened, modalClosed } = modalSlice.actions;

export default modalSlice.reducer;
