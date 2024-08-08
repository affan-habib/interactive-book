import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";
import { menuItems } from "@/constant/menu";
import SimpleBar from "simplebar-react";
import useSidebar from "@/hooks/theme/useSidebar";
import useSemiDark from "@/hooks/theme/useSemiDark";
import useSkin from "@/hooks/theme/useSkin";

const Sidebar = () => {
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

    const [collapsed, setMenuCollapsed] = useSidebar();
    const [menuHover, setMenuHover] = useState(false);

    // semi dark option
    const [isSemiDark] = useSemiDark();
    // skin
    const [skin] = useSkin();
    return (
        <div className={isSemiDark ? "dark" : ""}>
            <div
                className={`sidebar-wrapper bg-primary-600 dark:bg-slate-800 ${
                    collapsed ? "w-[72px] close_sidebar" : "w-[248px]"
                }
      ${menuHover ? "sidebar-hovered" : ""}
      ${
          skin === "bordered"
              ? "border-r border-slate-200 dark:border-slate-700"
              : "shadow-base"
      }
      `}
                onMouseEnter={() => {
                    setMenuHover(true);
                }}
                onMouseLeave={() => {
                    setMenuHover(false);
                }}
            >
                <SidebarLogo menuHover={menuHover} />
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
        </div>
    );
};

export default Sidebar;
