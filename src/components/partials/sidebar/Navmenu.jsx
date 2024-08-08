import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from "react-collapse";
import Icon from "@/components/ui/Icon";
import { useDispatch } from "react-redux";
import useMobileMenu from "@/hooks/theme/useMobileMenu";
import { useTranslation } from "react-i18next";

const Navmenu = ({ menus }) => {
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const { t, i18n } = useTranslation();
    const language = window.localStorage.getItem("language");

    const toggleSubmenu = (i) => {
        if (activeSubmenu === i) {
            setActiveSubmenu(null);
        } else {
            setActiveSubmenu(i);
        }
    };

    const location = useLocation();
    const locationName = location.pathname.replace("/", "");
    const [mobileMenu, setMobileMenu] = useMobileMenu();
    const dispatch = useDispatch();

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
        let submenuIndex = null;
        const formatedLinkName = formatURL();
        let menuTitle = "";

        menus.map((item, i) => {
            if (!item.child) {
                if (item.link === locationName) {
                    menuTitle = item.title;
                }
                return;
            }
            if (item.link === formatedLinkName) {
                submenuIndex = null;
                menuTitle = item.title;
            } else {
                const ciIndex = item.child.findIndex(
                    (ci) => ci.childlink === formatedLinkName
                );
                if (ciIndex !== -1) {
                    submenuIndex = i;
                    const child = item.child[ciIndex];
                    menuTitle = child.childtitle;
                }
            }
        });
        document.title = `LMS ${t(menuTitle)}`;

        setActiveSubmenu(submenuIndex);

        if (mobileMenu) {
            setMobileMenu(false);
        }
    }, [location, language]);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    return (
        <>
            <ul>
                {menus.map((item, i) => (
                    <li
                        key={i}
                        className={` single-sidebar-menu 
              ${item.child ? "item-has-children" : ""}
              ${activeSubmenu === i ? "open" : ""}
              ${locationName === item.link ? "menu-item-active" : ""}`}
                    >
                        {/* single menu with no childred*/}
                        {!item.child && !item.isHeadr && (
                            <NavLink className="menu-link" to={item.link}>
                                <span className="menu-icon flex-grow-0">
                                    <Icon icon={item.icon} />
                                </span>
                                <div className="text-box flex-grow">
                                    {t(item.title)}
                                </div>
                                {item.badge && (
                                    <span className="menu-badge">
                                        {item.badge}
                                    </span>
                                )}
                            </NavLink>
                        )}
                        {/* only for menulabel */}
                        {item.isHeadr && !item.child && (
                            <div className="menulabel">{t(item.title)}</div>
                        )}
                        {/*    !!sub menu parent   */}
                        {item.child && (
                            <div
                                className={`menu-link ${
                                    activeSubmenu === i
                                        ? "parent_active not-collapsed"
                                        : "collapsed"
                                }`}
                                onClick={() => toggleSubmenu(i)}
                            >
                                <div className="flex-1 flex items-start">
                                    <span className="menu-icon">
                                        <Icon icon={item.icon} />
                                    </span>
                                    <div className="text-box">
                                        {t(item.title)}
                                    </div>
                                </div>
                                <div className="flex-0 text-slate-50">
                                    <div
                                        className={`menu-arrow transform transition-all duration-300 ${
                                            activeSubmenu === i
                                                ? " rotate-90"
                                                : ""
                                        }`}
                                    >
                                        <Icon
                                            icon="heroicons-outline:chevron-right"
                                            className="text-slate-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <Collapse isOpened={activeSubmenu === i}>
                            <ul className="sub-menu">
                                {item.child?.map((subItem, j) =>
                                    subItem?.hidden === true ? null : (
                                        <li
                                            key={j}
                                            className="block pl-4 pr-1 my-4"
                                        >
                                            <NavLink to={subItem.childlink}>
                                                {({ isActive }) => (
                                                    <span
                                                        className={`${
                                                            isActive
                                                                ? " text-primary-300 dark:text-white font-medium"
                                                                : "text-slate-100 dark:text-slate-300"
                                                        } text-sm flex space-x-3 items-center transition-all duration-150`}
                                                    >
                                                        <span
                                                            className={`${
                                                                isActive
                                                                    ? " bg-slate-600 ring-4 ring-opacity-[35%] ring-primary-200"
                                                                    : "bg-slate-100"
                                                            } h-2 w-2 rounded-full border border-slate-100 inline-block flex-none`}
                                                        ></span>
                                                        <span className="flex-1 text-slate-50">
                                                            {t(
                                                                subItem.childtitle
                                                            )}
                                                        </span>
                                                    </span>
                                                )}
                                            </NavLink>
                                        </li>
                                    )
                                )}
                            </ul>
                        </Collapse>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Navmenu;
