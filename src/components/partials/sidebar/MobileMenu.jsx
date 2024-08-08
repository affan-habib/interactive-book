import React, { useRef, useEffect, useState } from "react";

import Navmenu from "./Navmenu";
import { menuItems } from "@/constant/menu";
import SimpleBar from "simplebar-react";
import useSemiDark from "@/hooks/theme/useSemiDark";
import useSkin from "@/hooks/theme/useSkin";
import useDarkMode from "@/hooks/theme/useDarkMode";
import { Link } from "react-router-dom";
import useMobileMenu from "@/hooks/theme/useMobileMenu";
import Icon from "@/components/ui/Icon";
import MobileLogo from "@/assets/images/logo/lms-logo.png";
import MobileLogoWhite from "@/assets/images/logo/lms-logo.png";

// import images
// import MobileLogo from "@/assets/images/logo/logo-c.svg";
// import MobileLogoWhite from "@/assets/images/logo/logo-c-white.svg";

const MobileMenu = ({ className = "custom-class" }) => {
    const scrollableNodeRef = useRef();
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (scrollableNodeRef.current.scrollTop > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };
        scrollableNodeRef.current.addEventListener("scroll", handleScroll);
    }, [scrollableNodeRef]);

    const [isSemiDark] = useSemiDark();
    // skin
    const [skin] = useSkin();
    const [isDark] = useDarkMode();
    const [mobileMenu, setMobileMenu] = useMobileMenu();
    return (
        <div
            className={`${className} fixed top-0 bg-primary-300 dark:bg-slate-800 shadow-lg  h-full w-[248px]`}
        >
            <div className="logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] h-[64px] px-4">
                <Link to="/dashboard">
                    <div className="flex items-center space-x-4">
                        <div className="logo-icon">
                            {!isDark && !isSemiDark ? (
                                <img src={MobileLogo} alt="" />
                            ) : (
                                <img src={MobileLogoWhite} alt="" />
                            )}
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                eLIB
                            </h1>
                        </div>
                    </div>
                </Link>
                <button
                    type="button"
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="cursor-pointer text-slate-900 dark:text-white text-2xl"
                >
                    <Icon icon="heroicons:x-mark" />
                </button>
            </div>

            <div
                className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
                    scroll ? " opacity-100" : " opacity-0"
                }`}
            ></div>
            <SimpleBar
                className="sidebar-menu h-[calc(100%-80px)]"
                scrollableNodeProps={{ ref: scrollableNodeRef }}
            >
                <Navmenu menus={menuItems} />
            </SimpleBar>
        </div>
    );
};

export default MobileMenu;
