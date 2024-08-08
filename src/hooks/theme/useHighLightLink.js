import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleHighLightLink } from "@/store/layout";

const useHighLightLink = () => {
  const dispatch = useDispatch();
  const isHighLightLink = useSelector((state) => state.layout.isHighLightLink);

  const setHighLightLink = (val) => dispatch(handleHighLightLink(val));

  const resetHighLightLink = () => {
    setHighLightLink(false);
  };

  useEffect(() => {
    const anchorElement = document.querySelector("a");

    if (isHighLightLink) {
      anchorElement.style.backgroundColor = "tomato";
      anchorElement.style.padding = "4px";
    } else {
      anchorElement.style.backgroundColor = "";
    }
  }, [isHighLightLink]);

  return [isHighLightLink, setHighLightLink, resetHighLightLink];
};

export default useHighLightLink;
