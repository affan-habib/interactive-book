import React from "react";
import useSkin from "@/hooks/theme/useSkin";
import { useTranslation } from "react-i18next";

const Card = ({
    children,
    title,
    subtitle,
    headerslot,
    className = "custom-class",
    bodyClass = "p-4",
    noborder,
    noDefaultBg = false,
    titleClass = "custom-class",
    bgColor,
    secondTitle = "",
    timeSpent = "",
    headerColor = "",
}) => {
    const [skin] = useSkin();
    const { t } = useTranslation();
    return (
        <div
            className={`
        card rounded-md ${noDefaultBg ? "" : "bg-white dark:bg-slate-800"}  ${skin === "bordered"
                    ? " border border-slate-200 dark:border-slate-700 "
                    : "shadow-base "
                } ${bgColor} ${className}
        `}
        >
            {(title || subtitle) && (
                <header
                    className={`card-header ${headerColor ? "rounded-tl-md rounded-tr-md" : ""} ${headerColor ? headerColor : ""} ${noborder ? "no-border" : ""}`}
                >
                    <div className={secondTitle && `w-full flex justify-between`}>
                        {title && (
                            <div className={`card-title ${titleClass}`}>
                                {t(title)}
                            </div>
                        )}
                        {secondTitle && (
                            <div className={`card-title ${titleClass}`}>
                                <p className="text-md text-gray-800 text-sm">{secondTitle}</p>
                                <p className="text-primary-600 text-lg">{timeSpent}</p>
                            </div>
                        )}
                        {subtitle && (
                            <div className="card-subtitle">{t(subtitle)}</div>
                        )}
                    </div>
                    {headerslot && (
                        <div className="card-header-slot">{headerslot}</div>
                    )}
                </header>
            )}
            <main className={`card-body ${bodyClass}`}>{children}</main>
        </div>
    );
};

export default Card;
