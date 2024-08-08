import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleShowHeading } from "@/store/layout";

const useShowHeading = () => {
  const dispatch = useDispatch();
  const isShowHeading = useSelector((state) => state.layout.isShowHeading);

  const setShowHeading = (val) => dispatch(handleShowHeading(val));

  const resetShowHeading = () => {
    setShowHeading(false);
  };

  useEffect(() => {
    const headingElement = document.querySelector("h1,h2,h3,h4,h5,h6");

    if (isShowHeading) {
      headingElement.style.backgroundColor = "rgb(205, 228, 0)";
      headingElement.style.padding = "6px";
    } else {
      headingElement.style.backgroundColor = "";
    }
  }, [isShowHeading]);

  return [isShowHeading, setShowHeading, resetShowHeading];
};

export default useShowHeading;
