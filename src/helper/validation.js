import { toEnglishNumber } from "./number";

export const validateEmail = (email) => {
    if (!email) return true;
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const validatePhone = (phone) => {
    if (!phone) return true;
    phone = toEnglishNumber(phone);
    if (String(phone).match(/^(?:(?:\+|00)88|01)?\d{11}$/)) return true;
    return String(phone).match(
        /^[\+]?[(]?[0-9]{0,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,9}$/im
    );
};
