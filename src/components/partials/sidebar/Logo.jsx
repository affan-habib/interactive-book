import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import useDarkMode from "@/hooks/theme/useDarkMode";
import useSidebar from "@/hooks/theme/useSidebar";
import useSemiDark from "@/hooks/theme/useSemiDark";
import useSkin from "@/hooks/theme/useSkin";

// import images
import MobileLogo from "@/assets/images/logo/lms-logo.png";
import MobileLogoWhite from "@/assets/images/logo/logo-c-white.svg";

const SidebarLogo = ({ menuHover }) => {
    const [isDark] = useDarkMode();
    const [collapsed, setMenuCollapsed] = useSidebar();
    // semi dark
    const [isSemiDark] = useSemiDark();
    // skin
    const [skin] = useSkin();
    return (
        <div
            className={` logo-segment flex justify-between items-center bg-primary-300 dark:bg-slate-800 z-[9] py-4  px-4 
      ${menuHover ? "logo-hovered" : ""}
      ${
          skin === "bordered"
              ? " border-b border-r-0 border-slate-200 dark:border-slate-700"
              : " border-none"
      }
      
      `}
        >
            <Link to="/dashboard">
                <div className="flex items-center space-x-4">
                    <div className="logo-icon">
                        {!isDark && !isSemiDark ? (
                            <img src={MobileLogo} alt="" className="h-8" />
                        ) : (
                            <img src={MobileLogoWhite} alt="" className="h-8" />
                        )}
                    </div>

                    {(!collapsed || menuHover) && (
                        <div>
                            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                LMS
                            </h1>
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default SidebarLogo;
