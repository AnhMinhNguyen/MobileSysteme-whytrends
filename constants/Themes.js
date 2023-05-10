import Colors from './Colors';

export const DayTheme = {
  dark: false,
  colors: {
    primary: Colors.primaryBlue,
    background: Colors.secondaryExtraLightGray,
    //background of navigation
    card: Colors.secondaryExtraLightGray,
    //text on top
    text: Colors.secondaryBlack,
    //border without shadows
    border: Colors.secondaryLightGray,
    //notifications on icons
    notification: Colors.primaryBlue,
  },
};

export const NightTheme = {
  dark: true,
  colors: {
    primary: Colors.primaryBlue,
    background: Colors.secondaryLightBlue,
    //background of navigation
    card: Colors.secondaryLightBlue,
    //text on top
    text: Colors.secondaryExtraExtraLightGray,
    //border without shadows
    border: Colors.secondaryDarkGray,
    //notifications on icons
    notification: Colors.primaryBlue,
  },
};

export const getGradientTheme = (isLight) => {
  return isLight ? ["#e4efe9", "#93a5cf", "#93a5cf"] : ["#485563", "#485563", "#29323c"];
};

export const getTextTheme = (isLight) => {
  return isLight ? Colors.secondaryBlack : Colors.secondaryExtraExtraLightGray
};

export const getDescriptionTextTheme = (isLight) => {
  return isLight ? Colors.secondaryDarkGray : Colors.secondaryLightGray;
};

export const getBackgroundTheme = (isLight) => {
  return isLight ? Colors.secondaryExtraLightGray : Colors.secondaryLightBlue;
};

export const getTrendEntryTheme = (isLight) => {
  return isLight ? Colors.secondaryLightGray : Colors.primaryBlue;
};

export const getPickerTextTheme = (isLight) => {
  return isLight ? Colors.secondaryBlack : Colors.secondaryExtraExtraLightGray;
};

export const getActiveIconTheme = (isLight) => {
  return isLight ? Colors.primaryBlue : Colors.primaryBlue;
};

export const getInactiveIconTheme = (isLight) => {
  return isLight ? Colors.secondaryDarkGray : Colors.secondaryExtraLightGray;
};