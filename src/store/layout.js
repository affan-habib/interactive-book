import { createSlice } from "@reduxjs/toolkit";

// theme config import
import themeConfig from "@/configs/themeConfig";

const initialDarkMode = () => {
  const item = window.localStorage.getItem("darkMode");
  return item ? JSON.parse(item) : themeConfig.layout.darkMode;
};

const initialSidebarCollapsed = () => {
  const item = window.localStorage.getItem("sidebarCollapsed");
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed;
};

const initialSemiDarkMode = () => {
  const item = window.localStorage.getItem("semiDarkMode");
  return item ? JSON.parse(item) : themeConfig.layout.semiDarkMode;
};

const initialRtl = () => {
  const item = window.localStorage.getItem("direction");
  return item ? JSON.parse(item) : themeConfig.layout.isRTL;
};

const initialSkin = () => {
  const item = window.localStorage.getItem("skin");
  return item ? JSON.parse(item) : themeConfig.layout.skin;
};

const initialMonochrome = () => {
  const item = window.localStorage.getItem("monochrome");
  return item ? JSON.parse(item) : themeConfig.layout.isMonochrome;
};

const initialInvertColor = () => {
  const item = window.localStorage.getItem("invertcolor");
  return item ? JSON.parse(item) : themeConfig.layout.isInvertColor;
};

const initialShowHeading = () => {
  const item = window.localStorage.getItem("showheading");
  return item ? JSON.parse(item) : themeConfig.layout.isShowHeading;
};

const initialHighLightLink = () => {
  const item = window.localStorage.getItem("highlightlink");
  return item ? JSON.parse(item) : themeConfig.layout.isHighLightLink;
};

const initialBigCursor = () => {
  const item = window.localStorage.getItem("bigcursor");
  // If the item exists in localStorage, return its parsed value
  if (item !== null) {
    return item === "true"; // Convert the string value to boolean
  } else {
    // Otherwise, return the default value from themeConfig
    return themeConfig.layout.isBigCursor;
  }
};
const initialFontSize = () => {
  const item = window.localStorage.getItem("fontSize");
  return item ? JSON.parse(item) : themeConfig.layout.fontSize;
};

const initialState = {
  isRTL: initialRtl(),
  darkMode: initialDarkMode(),
  isCollapsed: initialSidebarCollapsed(),
  customizer: themeConfig.layout.customizer,
  semiDarkMode: initialSemiDarkMode(),
  skin: initialSkin(),
  contentWidth: themeConfig.layout.contentWidth,
  menuHidden: themeConfig.layout.menu.isHidden,
  navBarType: themeConfig.layout.navBarType,
  footerType: themeConfig.layout.footerType,
  mobileMenu: themeConfig.layout.mobileMenu,
  isMonochrome: initialMonochrome(),
  isInvertColor: initialInvertColor(),
  isShowHeading: initialShowHeading(),
  isHighLightLink: initialHighLightLink(),
  isBigCursor: initialBigCursor(),
  fontSize: initialFontSize(),
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    // handle dark mode
    handleDarkMode: (state, action) => {
      state.darkMode = action.payload;
      window.localStorage.setItem("darkMode", action.payload);
    },
    // handle sidebar collapsed
    handleSidebarCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
      window.localStorage.setItem("sidebarCollapsed", action.payload);
    },
    // handle customizer
    handleCustomizer: (state, action) => {
      state.customizer = action.payload;
    },
    // handle semiDark
    handleSemiDarkMode: (state, action) => {
      state.semiDarkMode = action.payload;
      window.localStorage.setItem("semiDarkMode", action.payload);
    },
    // handle rtl
    handleRtl: (state, action) => {
      state.isRTL = action.payload;
      window.localStorage.setItem("direction", JSON.stringify(action.payload));
    },
    // handle skin
    handleSkin: (state, action) => {
      state.skin = action.payload;
      window.localStorage.setItem("skin", JSON.stringify(action.payload));
    },
    // handle content width
    handleContentWidth: (state, action) => {
      state.contentWidth = action.payload;
    },

    // handle menu hidden
    handleMenuHidden: (state, action) => {
      state.menuHidden = action.payload;
    },
    // handle navbar type
    handleNavBarType: (state, action) => {
      state.navBarType = action.payload;
    },
    // handle footer type
    handleFooterType: (state, action) => {
      state.footerType = action.payload;
    },
    handleMobileMenu: (state, action) => {
      state.mobileMenu = action.payload;
    },
    //handle Mono Chrome type
    handleMonoChrome: (state, action) => {
      state.isMonochrome = action.payload;
      window.localStorage.setItem("monochrome", JSON.stringify(action.payload));
    },
    //handle Invert Color type
    handleInvertColor: (state, action) => {
      state.isInvertColor = action.payload;
      window.localStorage.setItem(
        "invertcolor",
        JSON.stringify(action.payload)
      );
    },
    //handle Show Headings type
    handleShowHeading: (state, action) => {
      state.isShowHeading = action.payload;
      window.localStorage.setItem(
        "showheading",
        JSON.stringify(action.payload)
      );
    },

    //handle Big Cursor type
    handleBigCursor: (state, action) => {
      state.isBigCursor = action.payload;
      window.localStorage.setItem("bigcursor", action.payload);
    },

    //handle High Light Link type
    handleHighLightLink: (state, action) => {
      state.isHighLightLink = action.payload;
      window.localStorage.setItem(
        "highlightlink",
        JSON.stringify(action.payload)
      );
    },
    //handle Text Plus type
    handleTextPlus: (state, action) => {
      state.isTextPlus = action.payload;
      window.localStorage.setItem("textplus", JSON.stringify(action.payload));
    },

    //handle Text Minus type
    handleTextMinus: (state, action) => {
      state.isTextMinus = action.payload;
      window.localStorage.setItem("textminus", JSON.stringify(action.payload));
    },

    //handle Text Zero type
    handleTextZero: (state, action) => {
      state.isTextZero = action.payload;
      window.localStorage.setItem("textzero", JSON.stringify(action.payload));
    },
    //handle font size type
    handleFontSize: (state, action) => {
      state.fontSize = action.payload;
      window.localStorage.setItem("fontSize", JSON.stringify(action.payload));
    },
  },
});

export const {
  handleDarkMode,
  handleSidebarCollapsed,
  handleCustomizer,
  handleSemiDarkMode,
  handleRtl,
  handleSkin,
  handleContentWidth,
  handleMenuHidden,
  handleNavBarType,
  handleFooterType,
  handleMobileMenu,
  handleMonoChrome,
  handleBigCursor,
  handleInvertColor,
  handleShowHeading,
  handleHighLightLink,
  handleTextPlus,
  handleTextMinus,
  handleTextZero,
  handleFontSize,
} = layoutSlice.actions;

export default layoutSlice.reducer;
