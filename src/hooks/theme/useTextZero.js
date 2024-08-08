import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleTextZero } from "@/store/layout";

const useTextZero = () => {
  const dispatch = useDispatch();
  const isTextZero = useSelector((state) => state.layout.isTextZero);

  const setTextZero = (val) => dispatch(handleTextZero(val));

  useEffect(() => {
    const textSizeElement = document.querySelector("*");

    if (isTextZero) {
      textSizeElement.style.fontSize = "";
    } else {
      textSizeElement.style.fontSize = "";
    }
  }, [isTextZero]);

  return [isTextZero, setTextZero];
};

export default useTextZero;
