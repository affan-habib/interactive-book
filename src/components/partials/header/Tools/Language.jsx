import { useEffect, useState } from "react";
import Switch from "@/components/ui/Switch";
import { useTranslation } from "react-i18next";

const Language = () => {
    const selectedLanguage = window.localStorage.getItem("language");
    const [checked, setChecked] = useState(selectedLanguage === "bn");
    const { i18n } = useTranslation();

    const handleChange = () => {
        const lan = checked ? "en" : "bn";
        setChecked(!checked);
        i18n.changeLanguage(lan);
        window.localStorage.setItem("language", lan);
    };

    return (
        <div>
            <Switch
                activeClass="bg-success-500"
                inactiveClass="bg-danger-400 text-gray-100"
                value={checked}
                onChange={handleChange}
                badge
                prevText="BN"
                nextText="EN"
            />
        </div>
    );
};

export default Language;
