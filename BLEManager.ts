import { BleManager } from "react-native-ble-plx";

export const manager = new BleManager();

export const SERVER_NAME = "HelloWorldServer";

export const SERVICE_ID = "bf854c21-e070-446c-9849-305c7188a693";

export const CHARACTERISTIC_UUID_TX = "78628d2b-0008-4d46-b2c4-b755bf2c8c01";
export const CHARACTERISTIC_UUID_RX = "d95dc802-137e-4d13-a3f1-6f384193b7d7";

export const SERVICE_UUID_IMU = "91da3684-137e-4473-8fd2-b112126b19e1";
export const CHARACTERISTIC_UUID_YAW = "694b27b3-7c84-4a7e-a58c-baf08b34cc0c";
export const CHARACTERISTIC_UUID_PITCH = "58499525-a4cf-4bb9-9b16-a6ec73065923";
export const CHARACTERISTIC_UUID_ROLL = "7a5e5ca3-db92-41e5-807e-24f19751179f";
export const CHARACTERISTIC_UUID_X_ACCEL =
  "f881bd9e-1a9e-447c-b0a7-298c1069489e";
export const CHARACTERISTIC_UUID_Y_ACCEL =
  "c58d3d80-bb7b-4d22-9b1c-55a4c39e7308";
export const CHARACTERISTIC_UUID_Z_ACCEL =
  "aa744b51-7483-4d48-b973-df3eb0a05ff7";

export const CHARACTERISTIC_UUID_TIME = "4a7c0369-4188-47f3-b1ee-82784ee99d2a";

export const TIME_DIVIDER = 512;
