import { DARK_THEME, LIGHT_THEME } from "../constants/SettingSystem";
import { lightTheme, darkTheme } from "../cssVariable/cssVariable";
import { lightThemeSet, darkThemeSet } from "../cssVariable/cssVariable";
import { theme } from "antd";

export const getTheme = () => {
  let themeLocal = localStorage.getItem("theme");
  switch (themeLocal) {
    case DARK_THEME: {
      return {
        themeColor: darkTheme,
        themeColorSet: darkThemeSet,
        algorithm: theme.darkAlgorithm,
      };
    }
    case LIGHT_THEME: {
      return {
        themeColor: lightTheme,
        themeColorSet: lightThemeSet,
        algorithm: theme.defaultAlgorithm,
      };
    }
    default: {
      return {
        themeColor: darkTheme,
        themeColorSet: darkThemeSet,
        algorithm: theme.darkAlgorithm,
      };
    }
  }
};
