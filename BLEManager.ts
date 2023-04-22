import { BleManager } from "react-native-ble-plx";

export const manager = new BleManager();

export const SERVER_NAME = "HelloWorldServer";

export const SERVICE_ID = "bf854c21-e070-446c-9849-305c7188a693";

export const CHARACTERISTIC_UUID_TX = "78628d2b-0008-4d46-b2c4-b755bf2c8c01";
export const CHARACTERISTIC_UUID_RX = "d95dc802-137e-4d13-a3f1-6f384193b7d7";

export const SERVICE_UUID_IMU = "91da3684-137e-4473-8fd2-b112126b19e1";
export const CHARACTERISTIC_UUID_ANGULAR =
  "694b27b3-7c84-4a7e-a58c-baf08b34cc0c";
export const CHARACTERISTIC_UUID_ACCEL = "aa744b51-7483-4d48-b973-df3eb0a05ff7";

export const TIME_DIVIDER = 1000000; // convert us to s
