import React, { useEffect, useState } from "react";
import { menuItems } from "@/constant/menu";
import Icon from "@/components/ui/Icon";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HorizontalMenu = () => {
    const [index, setIndex] = useState(null);
    const { t } = useTranslation();
    const location = useLocation();
    const language = window.localStorage.getItem("language");
    const locationName = location.pathname.replace("/", "");
    const formatURL = () => {
        const url = locationName.split("/");
        const formatedURL = [];

        url.map((item, i) => {
            if (Number(item)) {
                return;
            } else {
                formatedURL.push(item);
            }
        });
        return formatedURL.join("/");
    };

    useEffect(() => {
        const formattedLinkName = formatURL();
        let menuTitle = "";

        menuItems.map((item, i) => {
            if (item.link === formattedLinkName) {
                setIndex(i);
                menuTitle = item.title;
            }
        });
        document.title = `LMS ${t(menuTitle)}`;
    }, [location, language]);

    return (
        <div className="main-menu">
            <ul>
                {menuItems?.map((item, i) => (
                    <li
                        key={i}
                        className={item.child ? "menu-item-has-children" : ""}
                    >
                        {/* Single menu*/}
                        {!item.child && (
                            <Link to={item.link}>
                                <div className="flex flex-1 items-center space-x-[6px] rtl:space-x-reverse">
                                    <span className="icon-box">
                                        <Icon
                                            icon={item.icon}
                                            className="text-primary-100"
                                        />
                                    </span>
                                    <div
                                        className={`text-box font-semibold text-primary-100 ${
                                            index == i ? "border-b" : ""
                                        }`}
                                    >
                                        {t(item.title)}
                                    </div>
                                </div>
                            </Link>
                        )}
                        {/* has dropdown*/}
                        {item.child && (
                            <a href="#">
                                <div className="flex flex-1 items-center space-x-[6px] rtl:space-x-reverse">
                                    <span className="icon-box text-primary-100">
                                        <Icon
                                            icon={item.icon}
                                            className="text-primary-100"
                                        />
                                    </span>
                                    <div className="text-box text-primary-100">
                                        {t(item.title)}
                                    </div>
                                </div>
                                <div className="flex-none text-sm ltr:ml-3 rtl:mr-3 leading-[1] relative top-1">
                                    <Icon
                                        icon="heroicons-outline:chevron-down"
                                        className="text-primary-100"
                                    />
                                </div>
                            </a>
                        )}
                        {/* Dropdown menu*/}
                        {item.child && (
                            <ul className="sub-menu">
                                {item.child.map((childitem, index) => (
                                    <li
                                        key={index}
                                        className="hover:bg-slate-100"
                                    >
                                        <Link to={childitem.link}>
                                            <div className="flex space-x-2 items-start rtl:space-x-reverse py-2">
                                                <Icon
                                                    icon={childitem.childicon}
                                                    className="leading-[1] text-primary-100 text-base"
                                                />
                                                <span className="leading-[1]">
                                                    {t(childitem.childtitle)}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HorizontalMenu;
