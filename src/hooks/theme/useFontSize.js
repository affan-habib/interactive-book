import { handleFontSize } from "@/store/layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFontSize = () => {
    const dispatch = useDispatch();
    const fontSize = useSelector((state) => state.layout.fontSize);

    const setSize = (val) => {
        dispatch(handleFontSize(val));
        const paragraphElement = document.querySelector("*");
        paragraphElement.style.fontSize = `${val}px`;
    };

    useEffect(() => {
        localStorage.setItem("fontSize", fontSize);
        setSize(fontSize);
    }, []);

    return [fontSize, setSize];
};

export default useFontSize;
