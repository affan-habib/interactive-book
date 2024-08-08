import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { menuItems } from "@/constant/menu";
import Icon from "@/components/ui/Icon";
import { useTranslation } from "react-i18next";

const Breadcrumbs = () => {
    const location = useLocation();
    const locationName = location.pathname.replace("/", "");
    const { t } = useTranslation();

    const [isHide, setIsHide] = useState(null);
    const [groupTitle, setGroupTitle] = useState("");
    const [childTitle, setChildTitle] = useState("");

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
        const formatedLinkName = formatURL();
        let menuTitle = "";
        const currentMenuItem = menuItems.find(
            (item) => item.link === formatedLinkName
        );
        const currentChild = menuItems.find((item) =>
            item.child?.find((child) => child.childlink === formatedLinkName)
        );
        if (
            currentChild &&
            currentChild.child &&
            currentChild.child.length > 0
        ) {
            currentChild.child.map((child) => {
                if (child.childlink === formatedLinkName) {
                    setChildTitle(child.childtitle);
                }
            });
        } else {
            setChildTitle(currentMenuItem?.title);
        }

        if (currentMenuItem) {
            setIsHide(currentMenuItem.isHide);
        } else if (currentChild) {
            setIsHide(currentChild?.isHide || false);
            setGroupTitle(currentChild?.title);
        }
    }, [location, locationName]);

    return (
        <>
            {!isHide ? (
                <div className="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
                    <ul className="breadcrumbs">
                        <li className="text-primary-500">
                            <NavLink to="/dashboard" className="text-lg">
                                <Icon icon="heroicons-outline:home" />
                            </NavLink>
                            <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                                <Icon icon="heroicons:chevron-right" />
                            </span>
                        </li>
                        {groupTitle && (
                            <li className="text-primary-500">
                                <button type="button" className="capitalize">
                                    {t(groupTitle)}
                                </button>
                                <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                                    <Icon icon="heroicons:chevron-right" />
                                </span>
                            </li>
                        )}
                        <li className="capitalize text-slate-500 dark:text-slate-400">
                            {t(childTitle)}
                        </li>
                    </ul>
                </div>
            ) : null}
        </>
    );
};

export default Breadcrumbs;
