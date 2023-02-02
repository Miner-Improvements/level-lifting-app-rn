import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "react-native-ble-plx";

interface BluetoothConnectionState {
  device: Device | null;
  connected: boolean;
}

const bluetoothConnectionSlice = createSlice({
  name: "bluetoothConnection",
  initialState: {
    device: null,
    connected: false,
  } as BluetoothConnectionState,
  reducers: {
    setConnected(state, action: PayloadAction<boolean>) {
      return {
        device: state.device,
        connected: action.payload,
      };
    },
    setBluetoothConnection(
      state,
      action: PayloadAction<BluetoothConnectionState>
    ) {
      return {
        device: action.payload.device,
        connected: action.payload.connected,
      };
    },
  },
});

export const { setConnected, setBluetoothConnection } =
  bluetoothConnectionSlice.actions;
export default bluetoothConnectionSlice.reducer;
