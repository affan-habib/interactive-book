import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import logo from '../footer/logo.svg';
import { useNavigate } from 'react-router-dom';
import Profile from "./Tools/Profile";
import useFetch from "../../../hooks/useFetch";

const Header = ({ className = "custom-class" }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const submenuRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSubmenuToggle = (index) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };

    const closeSubmenu = () => {
        setActiveSubmenu(null);
    };

    const { data: menuItems, isLoading, error } = useFetch({ queryKey: 'menu-list', endPoint: 'menu-list' });

    const user = JSON.parse(localStorage.getItem("name"));

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (submenuRef.current && !submenuRef.current.contains(event.target)) {
                closeSubmenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="fixed w-full z-30 top-0">
                <div className="bg-primary-500 text-white py-2">
                    <div className="max-w-screen-xl mx-auto flex justify-between items-center container">
                        <div className="flex items-center space-x-1">
                            <Icon icon="mdi:email" className="w-5 h-5" />
                            <span>info@bacbonltd.com</span>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-1">
                                <Icon icon="mdi:phone" className="w-5 h-5" />
                                <span>+88 01836 149 699</span>
                            </div>
                            <div className="border-l border-gray-300 h-6 mx-2"></div>
                            <div className="flex items-center space-x-1">
                                <Icon icon="mdi:phone" className="w-5 h-5" />
                                <span>+88 02 839 6401</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>EN</span>
                            <Icon icon="mdi:chevron-down" className="w-5 h-5" />
                        </div>
                    </div>
                </div>
                <nav className="bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
                        <a href="/" onClick={() => navigate('/')} className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={logo} className="h-8" alt="Flowbite Logo" />
                        </a>
                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <div className="flex items-center justify-center space-x-2">
                                <Profile />
                            </div>
                            <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded={isMenuOpen}>
                                <span className="sr-only">Open main menu</span>
                                <Icon icon="mdi:menu" className="w-5 h-5" />
                            </button>
                        </div>
                        <div className={`items-center justify-between ${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                {menuItems?.data.map((item, index) => {
                                    const hasSubmenu = (item.is_content && item.contents.length > 0) || (item.is_course && item.courses.length > 0);

                                    return (
                                        <li key={index} className="relative group">
                                            <button
                                                onClick={() => hasSubmenu ? handleSubmenuToggle(index) : item.is_course ? navigate(`/course-details/${item.id}`) : navigate(`/content-details/${item.id}`)}
                                                className={`flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${hasSubmenu ? 'cursor-pointer' : ''}`}
                                            >
                                                {item.name}
                                                {hasSubmenu && (
                                                    <Icon icon="mdi:chevron-down" className="ml-2 w-4 h-4" />
                                                )}
                                            </button>
                                            {hasSubmenu && activeSubmenu === index && (
                                                <ul ref={submenuRef} className="absolute left-0 mt-2 w-64 bg-gray-50 dark:bg-gray-800 shadow-lg py-2">
                                                    {item.is_content ? item.contents.map((submenu, index) => (
                                                        <li key={index}>
                                                            <a href={`/content-details/${submenu.id}`} className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white" onClick={closeSubmenu}>
                                                                {submenu.title}
                                                            </a>
                                                            {index < item.contents.length - 1 && (
                                                                <hr className="my-2 border-t border-gray-200 w-full" />
                                                            )}
                                                        </li>
                                                    )) : item.is_course && item.courses.map((submenu, index) => (
                                                        <li key={index}>
                                                            <a href={`/course-details/${submenu.id}`} className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white" onClick={closeSubmenu}>
                                                                {submenu.title}
                                                            </a>
                                                            {index < item.courses.length - 1 && (
                                                                <hr className="my-2 border-t border-gray-200 w-full" />
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
