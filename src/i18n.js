import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locale/en.json";
import bn from "@/locale/bn.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: true,
  },
  resources: {
    en: { translation: en },
    bn: { translation: bn },
  },
});

export default i18n;
