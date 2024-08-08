import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleInvertColor } from "@/store/layout";

const useInvertColor = () => {
  const dispatch = useDispatch();
  const isInvertColor = useSelector((state) => state.layout.isInvertColor);

  const setInvertColor = (val) => dispatch(handleInvertColor(val));

  const resetInvertColor = () => {
    setInvertColor(false);
  };

  useEffect(() => {
    const element = document.getElementsByTagName("html")[0];

    if (isInvertColor) {
      element.classList.add("invert");
    } else {
      element.classList.remove("invert");
    }
  }, [isInvertColor]);

  return [isInvertColor, setInvertColor, resetInvertColor];
};

export default useInvertColor;
