import { handleBigCursor } from "@/store/layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useBigCursor = () => {
  const [isBigCursor, setIsBigCursor] = useState(false);
  const dispatch = useDispatch();
  const reduxIsBigCursor = useSelector((state) => state.layout.isBigCursor);

  useEffect(() => {
    setIsBigCursor(reduxIsBigCursor);
  }, [reduxIsBigCursor]);

  const toggleBigCursor = () => {
    const newValue = !isBigCursor;
    setIsBigCursor(newValue);
    dispatch(handleBigCursor(newValue));
  };

  const resetBigCursor = () => {
    setIsBigCursor(false);
    dispatch(handleBigCursor(false));
  };

  return [isBigCursor, toggleBigCursor, resetBigCursor];
};

export default useBigCursor;
