// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { handleTextMinus } from "@/store/layout";

// const useTextMinus = () => {
//   const dispatch = useDispatch();
//   const isTextMinus = useSelector((state) => state.layout.isTextMinus);

//   const setTextMinus = (val) => dispatch(handleTextMinus(val));

//   useEffect(() => {
//     const paragraphElement = document.querySelector("*");
//     let currentPixel = paragraphElement.style.fontSize;
//     let fontSize = currentPixel.split("px");
//     fontSize = fontSize[0] ? fontSize[0] : 16;
//     if (isTextMinus && fontSize > 12) {
//       fontSize--;
//       paragraphElement.style.fontSize = `${fontSize}px`;
//     } else {
// paragraphElement.style.fontSize = "20px";
//     }
//   }, [isTextMinus]);

//   return [isTextMinus, setTextMinus];
// };

// export default useTextMinus;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleTextMinus } from "@/store/layout";

const useTextMinus = () => {
  const dispatch = useDispatch();
  const isTextMinus = useSelector((state) => state.layout.isTextMinus);

  const setTextMinus = (val) => dispatch(handleTextMinus(val));

  const resetTextMinus = () => {
    setTextMinus(false);
  };

  useEffect(() => {
    const paragraphElement = document.querySelector("*");
    let currentPixel = paragraphElement.style.fontSize;
    let fontSize = currentPixel.split("px");
    fontSize = fontSize[0] ? fontSize[0] : 16;
    if (isTextMinus && fontSize > 12) {
      fontSize--;
      paragraphElement.style.fontSize = `${fontSize}px`;
    } else {
      // paragraphElement.style.fontSize = "";
      // fontSize--;
    }
  }, [isTextMinus]);

  return [isTextMinus, setTextMinus, resetTextMinus];
};

export default useTextMinus;
