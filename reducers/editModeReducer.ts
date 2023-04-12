import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CombinedDarkTheme, CombinedDefaultTheme } from "../themes";
import { Appearance } from "react-native";

type ThemeType = "light" | "dark";
export interface ThemeData {
  themeType: ThemeType;
  theme: any;
}

const editModeSlice = createSlice({
  name: "editMode",
  initialState: false,
  reducers: {
    setEditMode(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setEditMode } = editModeSlice.actions;
export default editModeSlice.reducer;
