export const PER_PAGE = 10;

export const toastOption = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
};

export const QUIZ_TYPES = {
    QUIZ: 2,
    MATCHING: 3,
    FILL_GAP: 4,
    TRUE_FALSE: 5,
    WRITTEN: 6,
    DESCRIPTIVE: 7,
};

export const DEBOUNCE_TIMEOUT = 500;

export const MATCH_SYMBOL = /^[^!@#$%^&*+=<>:;|~]*$/;

import User1 from "@/assets/images/all-img/user.png";
import User2 from "@/assets/images/all-img/user2.png";
import User3 from "@/assets/images/all-img/user3.png";
import User4 from "@/assets/images/all-img/user4.png";
import User5 from "../assets/images/all-img/user5.jpeg";
// import User5 from "@/assets/images/all-img/profile.jepg";



export const notifications = [
    {
        title: "New course has been created",
        desc: "Engaged Learning Pedagogy (ELP), leadership course has been added by admin",
        image: User5,
        link: "#",

    },
    // {
    //     title: "Congratulations Darlene  🎉",
    //     desc: "Won the monthly best seller badge",
    //     unread: true,
    //     image: User2,
    //     link: "#",
    // },
    // {
    //     title: "Revised Order 👋",
    //     desc: "Won the monthly best seller badge",

    //     image: User3,
    //     link: "#",
    // },
    // {
    //     title: "Brooklyn Simmons",
    //     desc: "Added you to Top Secret Project group...",

    //     image: User4,
    //     link: "#",
    // },
];

export const message = [
    {
        title: "Wade Warren",
        desc: "Hi! How are you doing?.....",
        active: true,
        hasnotifaction: true,
        notification_count: 1,
        image: User1,
        link: "#",
    },
    {
        title: "Savannah Nguyen",
        desc: "Hi! How are you doing?.....",
        active: false,
        hasnotifaction: false,
        image: User2,
        link: "#",
    },
    {
        title: "Ralph Edwards",
        desc: "Hi! How are you doing?.....",
        active: false,
        hasnotifaction: true,
        notification_count: 8,
        image: User3,
        link: "#",
    },
    {
        title: "Cody Fisher",
        desc: "Hi! How are you doing?.....",
        active: true,
        hasnotifaction: false,
        image: User4,
        link: "#",
    },
    {
        title: "Savannah Nguyen",
        desc: "Hi! How are you doing?.....",
        active: false,
        hasnotifaction: false,
        image: User2,
        link: "#",
    },
    {
        title: "Ralph Edwards",
        desc: "Hi! How are you doing?.....",
        active: false,
        hasnotifaction: true,
        notification_count: 8,
        image: User3,
        link: "#",
    },
    {
        title: "Cody Fisher",
        desc: "Hi! How are you doing?.....",
        active: true,
        hasnotifaction: false,
        image: User4,
        link: "#",
    },
];

export const colors = {
    primary: "#4669FA",
    secondary: "#A0AEC0",
    danger: "#F1595C",
    black: "#111112",
    warning: "#FA916B",
    info: "#0CE7FA",
    light: "#425466",
    success: "#50C793",
    "gray-f7": "#F7F8FC",
    dark: "#1E293B",
    "dark-gray": "#0F172A",
    gray: "#68768A",
    gray2: "#EEF1F9",
    "dark-light": "#CBD5E1",
};
