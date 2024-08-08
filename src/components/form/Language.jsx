import { useEffect, useState } from "react";
import Switch from "@/components/ui/Switch";
import { useTranslation } from "react-i18next";

const Language = () => {
  const selectedLanguage = window.localStorage.getItem("language");
  const [checked, setChecked] = useState(selectedLanguage === "bn");
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, []);

  const handleChange = () => {
    const lan = checked ? "en" : "bn";
    setChecked(!checked);
    i18n.changeLanguage(lan);
    window.localStorage.setItem("language", lan);
  };

  return (
    <div>
      <div
        onClick={handleChange}
        className=" w-100 h-7 rounded-full overflow-hidden cursor-pointer shadow-xl border"
        style={{ width: "90px" }}
      >
        <div className={`w-1/2 h-full text-sm float-left flex items-center justify-center text-white ${!checked ? 'bg-[#114b58]' : ''}`}>
          ENG
        </div>
        <div className={`w-1/2 h-full text-sm float-left flex items-center justify-center text-white ${!checked ? '' : 'bg-[#114b58]'}`}>
        বাংলা
        </div>
      </div>
    </div>
  );
};

export default Language;
