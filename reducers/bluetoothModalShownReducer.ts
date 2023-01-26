import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const bluetoothModalShownSlice = createSlice({
  name: "bluetoothModalShown",
  initialState: false as boolean,
  reducers: {
    setBluetoothModalShown(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setBluetoothModalShown } = bluetoothModalShownSlice.actions;
export default bluetoothModalShownSlice.reducer;
