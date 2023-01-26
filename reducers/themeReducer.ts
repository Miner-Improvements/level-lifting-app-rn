import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CombinedDarkTheme, CombinedDefaultTheme } from "../themes";

type ThemeType = "light" | "dark";
export interface ThemeData {
  themeType: ThemeType;
  theme: any;
}

const themeSlice = createSlice({
  name: "theme",
  initialState: { themeType: "light", theme: CombinedDefaultTheme },
  reducers: {
    setTheme(state, action: PayloadAction<ThemeType>) {
      return {
        themeType: action.payload,
        theme:
          action.payload === "light" ? CombinedDefaultTheme : CombinedDarkTheme,
      };
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
