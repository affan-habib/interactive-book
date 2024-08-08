import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleTextPlus } from "@/store/layout";

const useTextPlus = () => {
  const dispatch = useDispatch();
  const isTextPlus = useSelector((state) => state.layout.isTextPlus);

  const setTextPlus = (val) => dispatch(handleTextPlus(val));

  useEffect(() => {
    const paragraphElement = document.querySelector("*");
    let currentPixel = paragraphElement.style.fontSize;
    let fontSize = currentPixel.split("px");
    fontSize = fontSize[0] ? fontSize[0] : 16;
    if (isTextPlus && fontSize < 20) {
      fontSize++;
      paragraphElement.style.fontSize = `${fontSize}px`;
    } else {
      // paragraphElement.style.fontSize = "20px";
    }
  }, [isTextPlus]);

  return [isTextPlus, setTextPlus];
};

export default useTextPlus;
